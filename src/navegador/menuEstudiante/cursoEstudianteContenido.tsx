import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

type Lesson = {
  idContenido: number;
  titulo: string;
  descripcion?: string;
  tipoContenido?: string;
  urlContenido?: string;
  locked?: boolean;
  completed?: boolean;
};

export const CursoEstudianteContenido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  const handleToggle = (lessonId: number, locked?: boolean) => {
    if (!locked) {
      setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    }
  };

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/contenidos/curso/${id}`)
      .then((response) => {
        const lessonsData = response.data || [];
        lessonsData.forEach((lesson: any) => {
          lesson.locked = lesson.locked || false;
          lesson.completed = lesson.completed || false;
        });
        setLessons(lessonsData);  
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
                onClick={() => handleToggle(lesson.idContenido, lesson.locked)}
              >
                <div className="flex items-center justify-between p-4">
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
                    <button className="text-sm text-blue-600 hover:underline">
                      {isExpanded ? "Ocultar" : "Ver contenido"}
                    </button>
                  )}
                </div>

                {/* Contenido de la lección */}
                {!isLocked && isExpanded && (
                  <div className="bg-blue-50 px-6 py-4 text-sm text-gray-700 space-y-3 border-t border-blue-200">
                    <p className="font-medium">
                      📄 Material Didáctico:
                    </p>
                    <a
                      href={lesson.urlContenido}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:underline"
                    >
                      Ver {lesson.tipoContenido} en Google Drive
                    </a>
                    <p className="font-medium">🎮 Juego interactivo:</p>
                    <a
                      href="https://www.kahoot.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:underline"
                    >
                      Ir al juego
                    </a>
                    <p className="font-medium">📝 Evaluación rápida:</p>
                    <a
                      href="https://quizizz.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:underline"
                    >
                      Realizar Quiz
                    </a>
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

