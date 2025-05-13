import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft, Circle } from "lucide-react";
import { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  completed?: boolean;
  locked?: boolean;
};

const mockLessons: Record<string, Lesson[]> = {
  matematicas: [
    { id: 1, title: "Números y Conteo", completed: true },
    { id: 2, title: "Suma y Resta", completed: true },
    { id: 3, title: "Tablas de Multiplicar", completed: false },
    { id: 4, title: "División Básica", locked: true },
  ],
  letras: [
    { id: 1, title: "Introducción a la Literatura", completed: true },
    { id: 2, title: "Fundamentos de la Poesía", completed: false },
    { id: 3, title: "Cuentos Cortos", locked: true },
  ],
  ciencia: [
    { id: 1, title: "Introducción a la Ciencia", completed: true },
    { id: 2, title: "Experimentos Básicos", completed: false },
  ],
  tecnologia: [
    { id: 1, title: "Introducción a las Computadoras", completed: true },
    { id: 2, title: "Habilidades Digitales", completed: false },
  ],
};

export const CursoEstudianteContenido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessons = mockLessons[id as keyof typeof mockLessons] || [];

  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  const handleToggle = (lessonId: number, locked?: boolean) => {
    if (!locked) {
      setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    }
  };

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
          {lessons.map((lesson) => {
            const isExpanded = expandedLesson === lesson.id;
            const isLocked = lesson.locked;
            const isCompleted = lesson.completed;

            return (
              <div
                key={lesson.id}
                className={`rounded-lg border shadow-md transition-all ${
                  isLocked
                    ? "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
                    : "bg-white hover:shadow-lg cursor-pointer"
                }`}
                onClick={() => handleToggle(lesson.id, lesson.locked)}
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
                    <h3 className="font-semibold text-lg text-gray-800">
                      {lesson.title}
                    </h3>
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
                    <p className="font-medium">📼 Video explicativo:</p>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:underline"
                    >
                      Ver video en YouTube
                    </a>

                    <p className="font-medium">
                      📄 Presentación en diapositivas:
                    </p>
                    <a
                      href="https://drive.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:underline"
                    >
                      Ver PDF en Google Drive
                    </a>

                    <p className="font-medium">🎮 Juego interactivo:</p>
                    <a
                      href="https://www.educaplay.com"
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
