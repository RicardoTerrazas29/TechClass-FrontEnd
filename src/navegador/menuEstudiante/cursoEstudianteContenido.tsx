import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Lock, ArrowLeft } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  completed?: boolean;
  locked?: boolean;
};
const mockLessons: Record<string, Lesson[]> = {
  matematicas: [
    { id: 1, title: "Numbers and Counting", completed: true },
    { id: 2, title: "Addition and Subtraction", completed: true },
    { id: 3, title: "Multiplication Tables", completed: false },
    { id: 4, title: "Basic Division", locked: true },
  ],
  letras: [
    { id: 1, title: "Introduction to Literature", completed: true },
    { id: 2, title: "Poetry Basics", completed: false },
    { id: 3, title: "Short Stories", locked: true },
  ],
  ciencia: [
    { id: 1, title: "Introduction to Science", completed: true },
    { id: 2, title: "Basic Experiments", completed: false },
  ],
  tecnologia: [
    { id: 1, title: "Introduction to Computers", completed: true },
    { id: 2, title: "Digital Skills", completed: false },
  ],
};

export const CursoEstudianteContenido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessons = mockLessons[id as keyof typeof mockLessons] || [];
  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        <ArrowLeft className="h-4 w-4 inline-block mr-2" />
        Volver a cursos
      </button>
      <h2 className="text-2xl font-bold mb-6">Contenido del curso</h2>
      <div className="max-w-3xl">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`mb-4 p-4 border rounded-lg bg-white ${
              lesson.locked
                ? "opacity-60"
                : "hover:border-primary cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {lesson.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {lesson.locked && (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                <h3 className="font-medium">{lesson.title}</h3>
              </div>
              {!lesson.locked && !lesson.completed && (
                <button className="text-sm text-primary hover:underline">
                  Iniciar Lección
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
