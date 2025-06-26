import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft, Circle, ChevronDown, ChevronUp, File } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// Definiciones de tipos para mayor claridad
type Lesson = {
    idContenido: number;
    titulo: string;
    descripcion?: string;
    tipoContenido?: string;
    urlContenido?: string;
    locked?: boolean;
    recursos: Resource[];
    idLogro?: number; // ID del logro asociado a este contenido
};

type LessonList = {
    nombreCurso: string;
    contenidos: Lesson[];
}

type Resource = {
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
    const { id } = useParams(); // ID del curso
    const navigate = useNavigate();
    const location = useLocation(); // Para acceder al estado de navegación

    // Estado para la lista de lecciones/contenidos del curso
    const [lessons, setLessons] = useState<Lesson[]>([]);
    // Estado para los recursos agrupados por contenido
    const [resources, setResources] = useState<ResourceList[]>([]);
    // Estado para controlar qué lección/contenido está expandido
    const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
    // Nuevo estado para indicar si los datos iniciales (lecciones y recursos) han sido cargados
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Estado para los recursos que el estudiante ha revisado (persiste en localStorage)
    const [reviewed, setReviewed] = useState<{[idRecurso: number]: boolean}>(() => {
        try {
            const storedReviewed = localStorage.getItem('recursosRevisados');
            return storedReviewed ? JSON.parse(storedReviewed) : {};
        } catch (error) {
            console.error("Error al cargar recursos revisados de localStorage:", error);
            return {};
        }
    });

    // Estado para los contenidos que el estudiante ha completado (todos sus recursos revisados) (persiste en localStorage)
    const [contentCompleted, setContentCompleted] = useState<{[idContenido:number]:boolean}>(() => {
        try {
            const storedCompleted = localStorage.getItem('contenidosCompletados');
            return storedCompleted ? JSON.parse(storedCompleted) : {};
        } catch (error) {
            console.error("Error al cargar contenidos completados de localStorage:", error);
            return {};
        }
    });

    // useEffect para guardar el estado 'reviewed' en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('recursosRevisados', JSON.stringify(reviewed));
    }, [reviewed]);

    // useEffect para guardar el estado 'contentCompleted' en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('contenidosCompletados', JSON.stringify(contentCompleted));
    }, [contentCompleted]);

    // Función para expandir/colapsar una lección/contenido
    const handleToggle = (lessonId: number, locked?: boolean) => {
        if (!locked) { // Solo se puede expandir si no está bloqueado
            setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
        }
    };

    // Función para marcar un recurso como revisado y verificar si el contenido está completo
    const checkResourceReviewed = async (idRecurso: number, idContenido: number, idEstudiante: number) => {
        setReviewed(prevReviewed => {
            const newReviewed = { ...prevReviewed, [idRecurso]: true };
            // Obtiene todos los recursos del contenido actual a partir del estado `resources` cargado
            // Es CRUCIAL que `resources` esté cargado y contenga todos los recursos correctos aquí.
            const currentContentResources = resources.find(r => r.idContenido === idContenido)?.recursos || [];
            // Verifica si *todos* los recursos de este contenido están ahora revisados
            // Si currentContentResources está vacío, allResourcesInContentReviewed será true, lo cual es el error anterior.
            // La solución se asegura que resources esté cargado antes de llamar a esta función.
            const allResourcesInContentReviewed = currentContentResources.every(r => newReviewed[r.idRecurso]);

            if (allResourcesInContentReviewed && !contentCompleted[idContenido]) { 
                setContentCompleted(prev => ({ ...prev, [idContenido]: true })); 
                
                const lesson = lessons.find(l => l.idContenido === idContenido);
                const idLogro = lesson?.idLogro;

                if (idLogro && idEstudiante) {
                    axios.post(`http://localhost:8080/api/logros/${idEstudiante}/${idLogro}`, { idContenido })
                        .then(() => {
                            localStorage.setItem('mostrarModalLogro', 'true');
                        })
                        .catch(error => {
                            console.error("Error asignando logro:", error);
                        });
                }
            }
            return newReviewed; 
        });
    };

    // useEffect para cargar los contenidos del curso al montar el componente o cambiar el ID del curso
    useEffect(() => {
        axios.get<LessonList>(`http://localhost:8080/api/contenidos/curso/${id}`)
            .then(async (response) => {
                const lessonsData = response.data || { contenidos: [] };
                setLessons(lessonsData.contenidos); 
                
                const resourcesData: ResourceList[] = [];
                lessonsData.contenidos.forEach((lesson) => {
                    if (lesson.recursos && lesson.recursos.length > 0) {
                        resourcesData.push({
                            idContenido: lesson.idContenido,
                            recursos: lesson.recursos,
                        });
                    }
                });
                setResources(resourcesData);
                setIsDataLoaded(true); // Marca que los datos han sido cargados exitosamente
            })
            .catch((error) => {
                console.error("Error cargando contenidos del curso:", error);
                setIsDataLoaded(true); // También marca como cargado para evitar un estado de carga infinito en caso de error
            });
    }, [id]);

    // useEffect para procesar el estado de navegación cuando se vuelve de un recurso
    // Se ejecutará solo cuando los datos estén cargados (`isDataLoaded` sea true)
    useEffect(() => {
        if (isDataLoaded && location.state && location.state.revisado && location.state.idRecurso && location.state.idContenido) {
            const { idRecurso, idContenido } = location.state;
            const idEstudiante = Number(localStorage.getItem("idEstudiante")); 
            
            // Asegúrate de que el contenido con sus recursos esté realmente disponible en el estado `resources`
            const foundContentResources = resources.find(r => r.idContenido === idContenido);

            if (idEstudiante && foundContentResources) {
                // Solo llama a checkResourceReviewed si idEstudiante existe y los recursos del contenido han sido cargados
                checkResourceReviewed(idRecurso, idContenido, idEstudiante);
            } else if (!idEstudiante) {
                console.warn("idEstudiante no encontrado en localStorage. No se pudo marcar el recurso como revisado.");
            } else if (!foundContentResources) {
                console.warn(`Contenido ${idContenido} no encontrado en los recursos cargados. Esto puede indicar un problema de carga o datos.`);
            }
            // Limpia el estado de navegación después de procesarlo para evitar re-ejecuciones no deseadas
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [isDataLoaded, location.state, navigate, resources]); // 'resources' es crucial como dependencia aquí

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-photo/top-view-geometric-forms-with-copy-space_23-2148830233.jpg')",
            }}
        >
            <div className="p-6 max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg">
                <button
                    onClick={() => navigate('/estudiante/cursos')}
                    className="mb-6 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a cursos
                </button>

                <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
                    📚 Contenido del Curso
                </h2>
                <p className="text-gray-700 mb-8 text-center">
                    Explora las lecciones, completa actividades y gana experiencia.
                </p>

                <div className="space-y-4">
                    {lessons.map((lesson: Lesson) => {
                        const isExpanded = expandedLesson === lesson.idContenido;
                        const isLocked = lesson.locked;
                        const isCompleted = contentCompleted[lesson.idContenido]; // Usar el estado persistente

                        return (
                            <div
                                key={lesson.idContenido}
                                className={`rounded-lg border shadow-md transition-all duration-300 ease-in-out ${
                                    isLocked
                                        ? "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
                                        : "bg-white hover:shadow-lg cursor-pointer"
                                }`}
                            >
                                <div 
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-t-lg" 
                                    onClick={() => handleToggle(lesson.idContenido, lesson.locked)}
                                >
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
                                            <p className="text-gray-600 text-sm">{lesson.descripcion}</p>
                                        </div>
                                    </div>
                                    {!isLocked && (
                                        <button className="text-sm text-gray-500 hover:text-gray-700" aria-label={isExpanded ? "Contraer" : "Expandir"}>
                                            {isExpanded ? <ChevronUp/> : <ChevronDown/>}
                                        </button>
                                    )}
                                </div>

                                {/* Contenido de la lección - recursos */}
                                {!isLocked && isExpanded && (
                                    <div className="bg-blue-50 px-4 py-4 text-sm text-gray-700 space-y-3 border-t border-blue-200 rounded-b-lg">
                                        {resources.map((resourceGroup) => {
                                            if (resourceGroup.idContenido === lesson.idContenido) {
                                                return resourceGroup.recursos.map((res) => {
                                                    return(
                                                        <div key={res.idRecurso} className="flex-col">
                                                            <div 
                                                                className="flex w-full text-left text-decoration-none hover:bg-blue-100 p-3 rounded-lg items-center gap-2 transition duration-200 ease-in-out"
                                                                onClick={()=>navigate(`recurso/${res.idRecurso}`,{state:{url: res.url, nombre:res.nombre, idRecurso: res.idRecurso, idContenido: lesson.idContenido}})}
                                                            >
                                                                <div className="text-blue-600"><File className="h-5 w-5"/></div>
                                                                <div className="flex-1 flex flex-col">
                                                                    <span className="text-gray-600 text-xs">
                                                                        Material . {res.tipoContenido || 'Desconocido'}
                                                                    </span>
                                                                    <p className="text-lg hover:underline text-blue-800 font-medium">Ver {res.nombre}</p>
                                                                </div>
                                                                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${reviewed[res.idRecurso] ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                                                                    {reviewed[res.idRecurso] ? 'Revisado' : 'No revisado'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                });
                                            }
                                            return null; 
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
