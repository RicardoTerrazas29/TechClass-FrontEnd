import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft, Circle, ChevronDown, ChevronUp, File } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "inspector";

type Lesson = {
  idContenido: number;
  titulo: string;
  descripcion?: string;
  tipoContenido?: string;
  urlContenido?: string;
  locked?: boolean;
  completed?: boolean;
  recursos: Resource[];
};

type LessonList = {
  nombreCurso: string;
  contenidos: Lesson[];
}
type Resource ={
  idRecurso: number;
  nombre: string;
  tipoContenido?: string;
  url?: string;
}

type ResourceList = {
  idContenido: number;
  recursos: Resource[];
}

export const CursoEstudianteContenido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [resources, setResources] = useState<ResourceList[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);
  
  const handleToggle = (lessonId: number, locked?: boolean) => {
    if (!locked) {
      setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    }
  };

  const handleToggleResource = (resourceId: number) => {
    setExpandedResource(expandedResource === resourceId ? null : resourceId);
  };

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contenidos/curso/${id}`)
      .then((response) => {
        const lessonsData:LessonList = response.data || [];
        setLessons(lessonsData.contenidos || []);
        const resourcesData:ResourceList[] = [];
        lessonsData.contenidos.forEach((lesson) => {
          if (lesson.recursos && lesson.recursos.length > 0) {
            resourcesData.push({
              idContenido: lesson.idContenido,
              recursos: lesson.recursos,
            });
          }
        });
        setResources(resourcesData);
      })
      .catch((error) => {console.log(error);
      });
  }, [id]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url(' https://img.freepik.com/free-photo/top-view-geometric-forms-with-copy-space_23-2148830233.jpg')",
      }}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a cursos
        </button>

        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600">
          📚 Contenido del Curso
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Explora las lecciones, completa actividades y gana experiencia.
        </p>

        <div className="space-y-4">
          {lessons.map((lesson: Lesson) => {
            const isExpanded = expandedLesson === lesson.idContenido;
            const isLocked = lesson.locked;
            const isCompleted = lesson.completed;

            return (
              <div
                key={lesson.idContenido}
                className={`rounded-lg border shadow-md transition-all ${
                  isLocked
                    ? "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
                    : "bg-white hover:shadow-lg cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between p-4 hover:bg-gray-50"  onClick={() => handleToggle(lesson.idContenido, lesson.locked)}>
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : isLocked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{lesson.titulo}</h3>
                      <p>{lesson.descripcion}</p>
                    </div>
                  </div>
                  {!isLocked && (
                    <button className="text-sm hover:underline" >
                      {isExpanded ? <ChevronUp/> : <ChevronDown/>}
                    </button>
                  )}
                </div>

                {/* Contenido de la lección */}
                {!isLocked && isExpanded && (
                  <div className="bg-blue-50 px-4 py-4 text-sm text-gray-700 space-y-3 border-t border-blue-200">
                    {resources.map((resource) => {
                      if (resource.idContenido === lesson.idContenido) {
                        return resource.recursos.map((res) => {
                          const isResourceExpanded = expandedResource === res.idRecurso;
                          return(
                          <div key={res.idRecurso} className="flex-col items-center gap-2">
                            <div 
                            className="flex items-center justify-between p-2 gap-2 hover:bg-gray-50"  
                            onClick={() => handleToggleResource(res.idRecurso)}>
                              <p>{res.nombre}</p>
                              <button className="text-sm">
                                {isResourceExpanded ? <ChevronUp/> : <ChevronDown/>}
                              </button>                            
                            </div>
                            <hr className="border-gray-600 my-2" />
                            {isResourceExpanded && (
                              <div
                                onClick={()=>navigate(`recurso/${res.idRecurso}`,{state:{url: res.url, nombre:res.nombre}})}
                                className="flex w-full text-left text-decoration-none hover:bg-gray-50 p-4 rounded-lg items-center gap-2"
                              >
                                <div className="text-dark"><File/></div>
                                <div className="flex-col">
                                  <span className="text-gray-500">
                                    Material . {res.tipoContenido}
                                  </span>
                                  <p className="text-lg hover:underline text-blue-500">Ver {res.nombre}</p>
                                </div>
                              </div>
                            )}     
                          </div>
                          );
                        });
                      }
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

