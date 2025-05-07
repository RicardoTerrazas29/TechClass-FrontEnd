import { Calculator, Book, Laptop, BoxIcon } from "lucide-react";
import { CourseCard } from "../../Components/CourseCard";
const courses = [
  {
    id: "matematicas",
    title: "Matemáticas",
    description: "Fundamental concepts of mathematics for primary education",
    icon: Calculator,
    color: "bg-blue-500",
  },
  {
    id: "letras",
    title: "Letras",
    description: "Reading comprehension and writing skills",
    icon: Book,
    color: "bg-purple-500",
  },
  {
    id: "ciencia",
    title: "Ciencia",
    description: "Basic scientific concepts and experiments",
    icon: BoxIcon,
    color: "bg-green-500",
  },
  {
    id: "tecnologia",
    title: "Tecnología",
    description: "Introduction to computers and digital skills",
    icon: Laptop,
    color: "bg-orange-500",
  },
];
const CursoEstudiante = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mis Cursos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              icon={Icon}
              color={course.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CursoEstudiante;
