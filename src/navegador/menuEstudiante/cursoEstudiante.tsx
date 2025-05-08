import { Calculator, Book, Laptop, BoxIcon } from "lucide-react";
import { CourseCard } from "../../Components/CourseCard";

const courses = [
  {
    id: "matematicas",
    title: "Matemáticas",
    description: "Fundamentos clave de las matemáticas en primaria",
    icon: Calculator,
    color: "bg-blue-500",
  },
  {
    id: "letras",
    title: "Letras",
    description: "Lectura comprensiva y redacción básica",
    icon: Book,
    color: "bg-purple-500",
  },
  {
    id: "ciencia",
    title: "Ciencia",
    description: "Experimentos y conceptos científicos iniciales",
    icon: BoxIcon,
    color: "bg-green-500",
  },
  {
    id: "tecnologia",
    title: "Tecnología",
    description: "Habilidades digitales y uso de computadoras",
    icon: Laptop,
    color: "bg-orange-500",
  },
];

const CursoEstudiante = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#2F3542] mb-6 text-center md:text-left">
        📘 Mis Cursos
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
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

        {/* Panel lateral */}
        <div className="w-full md:w-80 bg-white shadow-lg rounded-xl p-5 border border-[#CED6E0]">
          <h3 className="text-xl font-semibold text-[#3742FA] mb-4">
            🧭 Panel de Progreso
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Progreso general:</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
              <div className="bg-green-500 h-3 rounded-full w-[65%]" />
            </div>
            <p className="text-sm text-gray-500 mt-1">65% completado</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Próxima evaluación:</p>
            <p className="font-medium text-[#2F3542]">10 de mayo - Ciencia</p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-600">Logros recientes:</p>
            <ul className="list-disc list-inside text-sm text-[#2F3542]">
              <li>📈 Superaste el nivel básico en Tecnología</li>
              <li>📚 Completaste el módulo de Lectura</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoEstudiante;
