import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft, Circle, ChevronDown, ChevronUp, File } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import AchievementModal from "@/Components/AchievementModal";

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

type Logro = {
    idLogro: number;
    contenido?: { idContenido: number };
    // otros campos si los tienes
};

export const CursoEstudianteContenido = () => {
    const { id } = useParams(); // ID del curso
    const navigate = useNavigate();
    const location = useLocation();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [resources, setResources] = useState<ResourceList[]>([]);
    const [expandedLesson, setExpandedLesson] = useState<number | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [logros,setLogros] = useState<Logro[]>([]);
    const [currentAchievementId, setCurrentAchievementId] = useState<number|null>()
    const [reviewed, setReviewed] = useState<{[idRecurso: number]: boolean}>({});
    const [contentCompleted, setContentCompleted] = useState<{[idContenido:number]:boolean}>({});
    const [prevContentCompleted, setPrevContentCompleted] = useState<{[idContenido:number]:boolean}>({});
    //cargar logros
    useEffect(() => {
      axios.get('http://localhost:8080/api/logros')
        .then(res => {setLogros(res.data)})
        .catch(() => setLogros([]));
    }, []);

    useEffect(() => {
        const idEstudiante = Number(localStorage.getItem("idEstudiante"));
        if (!idEstudiante) return;
        axios.get(`http://localhost:8080/api/contenidos/estudiantes/${idEstudiante}/progreso/curso/${id}`)
            .then(res => {
                const reviewedFlat: { [idRecurso: number]: boolean } = {};
                Object.values(res.data.revisados || {}).forEach((arr: number[]) => {
                    arr.forEach(id => { reviewedFlat[id] = true; });
                });
                setReviewed(reviewedFlat);

                const newContentCompleted = (res.data.completados || []).reduce((acc: any, id: number) => ({ ...acc, [id]: true }), {});
                
                // Detecta si hay un contenido recién completado o completado y nunca mostrado el logro
                for (const idContenido in newContentCompleted) {
                    // Solo muestra el modal si no se ha mostrado antes para este contenido
                    if (!localStorage.getItem(`logroMostrado_${idContenido}`)) {
                        const logro = logros.find(l => l.contenido?.idContenido === Number(idContenido));
                        if (logro && idEstudiante) {
                            setCurrentAchievementId(logro.idLogro);
                            setShowModal(true);
                            localStorage.setItem(`logroMostrado_${idContenido}`, "true");
                            axios.post(`http://localhost:8080/api/logros/${idEstudiante}/${logro.idLogro}`)
                                .catch(error => {
                                    console.error("Error asignando logro:", error);
                                });
                        }
                    }
                }
                setPrevContentCompleted(newContentCompleted);
                setContentCompleted(newContentCompleted);
            })
            .catch(() => {
                setReviewed({});
                setContentCompleted({});
            });
    }, [id, logros]);
    //cargar progreso y mostrar model del logro si corresponde
    useEffect(() => {
        const idEstudiante = Number(localStorage.getItem("idEstudiante"));
        if (!idEstudiante) return;
        axios.get(`http://localhost:8080/api/contenidos/estudiantes/${idEstudiante}/progreso/curso/${id}`)
            .then(res => {
                const reviewedFlat: { [idRecurso: number]: boolean } = {};
                Object.values(res.data.revisados || {}).forEach((arr: number[]) => {
                    arr.forEach((id:number) => { reviewedFlat[id] = true; });
                });
                setReviewed(reviewedFlat);

                
                const newContentCompleted = (res.data.completados || []).reduce(
                    (acc: any, cid: number) => ({ ...acc, [cid]: true }), {}
                );

                // Mostrar modal y asignar logro si nunca se mostró para este contenido
                for (const idContenido in newContentCompleted) {
                    if (!localStorage.getItem(`logroMostrado_${idContenido}`)) {
                        const logro = logros.find(l => l.contenido?.idContenido === Number(idContenido));
                        if (logro && idEstudiante) {
                            setCurrentAchievementId(logro.idLogro);
                            setShowModal(true);
                            localStorage.setItem(`logroMostrado_${idContenido}`, "true");
                            axios.post(`http://localhost:8080/api/logros/${idEstudiante}/${logro.idLogro}`)
                                .catch(error => {
                                    console.error("Error asignando logro:", error);
                                });
                        }
                    }
                }
                setPrevContentCompleted(newContentCompleted);
                setContentCompleted(newContentCompleted);
            })
            .catch(() => {
                setReviewed({});
                setContentCompleted({});
            });
    }, [id]);

    // Función para expandir/colapsar una lección/contenido
    const handleToggle = (lessonId: number, locked?: boolean) => {
        if (!locked) { // Solo se puede expandir si no está bloqueado
            setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
        }
    };

    // Función para marcar un recurso como revisado y verificar si el contenido está completo
    const checkResourceReviewed = async (idRecurso: number, idContenido: number, idEstudiante: number) => {
        try {
            await axios.post(`http://localhost:8080/api/contenidos/recursos/${idEstudiante}/revisado`, {
                idRecurso,
                idContenido
            });
        } catch (error) {
            // Si ya está revisado, puedes ignorar el error 409
        }
        const reviewedFlat: { [idRecurso: number]: boolean } = {};
        const res = await axios.get(`http://localhost:8080/api/contenidos/estudiantes/${idEstudiante}/progreso/curso/${id}`);
        Object.values(res.data.revisados || {}).forEach((arr: number[]) => {
            arr.forEach(id => { reviewedFlat[id] = true; });
        });
        setReviewed(reviewedFlat);
        setContentCompleted(
            (res.data.completados || []).reduce((acc: any, id: number) => ({ ...acc, [id]: true }), {})
        );
        const currentContentResources = resources.find(r => r.idContenido === idContenido)?.recursos || [];
        const allResourcesInContentReviewed = currentContentResources.every(r => reviewedFlat[r.idRecurso]);

        if (allResourcesInContentReviewed && !contentCompleted[idContenido]) {
            try {
                await axios.post(`http://localhost:8080/api/contenidos/${idEstudiante}/completado`, {
                    idContenido,
                    idRecurso: null // si tu backend lo requiere, si no, solo idContenido
                });
            } catch (error) {
                // Si ya está completado, puedes ignorar el error 409
            }

            setContentCompleted(prev => ({ ...prev, [idContenido]: true }));

            const logro = logros.find(l => l.contenido?.idContenido === idContenido);
            if (logro && idEstudiante) {
                setCurrentAchievementId(logro.idLogro);
                setShowModal(true);
                localStorage.setItem(`logroMostrado_${idContenido}`, "true");
                axios.post(`http://localhost:8080/api/logros/${idEstudiante}/${logro.idLogro}`)
                    .catch(error => {
                        console.error("Error asignando logro:", error);
                    });
            }
        }
    };
    //cargar contenidos y recursos
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
                setIsDataLoaded(true);
            })
            .catch(() => setIsDataLoaded(true));
    }, [id]);

    // Marcar recurso como revisado desde navegación
    useEffect(() => {
        if (isDataLoaded && location.state && location.state.revisado && location.state.idRecurso && location.state.idContenido) {
            const { idRecurso, idContenido } = location.state as { idRecurso: number, idContenido: number };
            const idEstudiante = Number(localStorage.getItem("idEstudiante"));
            const foundContentResources = resources.find(r => r.idContenido === idContenido);
            if (idEstudiante && foundContentResources) {
                checkResourceReviewed(idRecurso, idContenido, idEstudiante);
            }
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [isDataLoaded, location.state, navigate, resources]);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6"
            style={{backgroundImage:"url('https://img.freepik.com/free-photo/top-view-geometric-forms-with-copy-space_23-2148830233.jpg')",}}
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
                const isCompleted = contentCompleted[lesson.idContenido];

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
            {/* Modal de Logro */}
            {showModal && currentAchievementId &&(
            <AchievementModal
                isOpen={true}
                onClose={() => setShowModal(false)}
                idLogro={currentAchievementId ?? 0}
            />
            )}
        </div>
    );
};
