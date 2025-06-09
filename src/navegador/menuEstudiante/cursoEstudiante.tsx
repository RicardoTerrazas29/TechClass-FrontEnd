import { Calculator, Book, Laptop, BoxIcon } from "lucide-react";
import { CourseCard } from "../../Components/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

const courses = [
  {
    id: "matematicas",
    title: "Matemáticas",
    description: "Aprende a sumar, restar y jugar con los números.",
    icon: Calculator,
    color: "bg-blue-400",
  },
  {
    id: "letras",
    title: "Letras",
    description: "Descubre el mundo leyendo cuentos y escribiendo historias.",
    icon: Book,
    color: "bg-pink-400",
  },
  {
    id: "ciencia",
    title: "Ciencia",
    description: "Explora la naturaleza con experimentos divertidos.",
    icon: BoxIcon,
    color: "bg-green-400",
  },
  {
    id: "tecnologia",
    title: "Tecnología",
    description: "Aprende con la computadora y juega mientras estudias.",
    icon: Laptop,
    color: "bg-yellow-400",
  },
];

const CursoEstudiante = () => {
  const [cursos, setCursos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/asignaciones").then((response) => {
      const asignaciones = response.data;

      const cursos: any = []
      for (let i = 0; i < asignaciones.length; i++) {
         if (asignaciones[i].estudiante.idEstudiante == localStorage.getItem("idEstudiante")) {
          cursos.push(asignaciones[i].curso);
        }
      }
      setCursos(cursos);
    }).catch((error) => {
      console.log(error);})
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-psd/science-background-with-laboratory-equipment_23-2150181635.jpg')",
      }}
    >
      <div className="p-6  min-h-screen">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          📘 ¡Hola, Explorador! Estos son tus cursos
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tarjetas de cursos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {cursos.map((curso:any) => {
              return (
                <CourseCard
                  key={curso.idCurso}
                  id={curso.idCurso}
                  title={curso.nombre}
                  description={curso.descripcion}
                  icon={curso.foto}
                  profesor={curso.profesor.name}
                />
              );
            })}
          </div>

          {/* Panel de Progreso */}
          <div className="w-full lg:w-80 bg-white rounded-2xl shadow-xl p-6 border border-[#DDE6ED]">
            <h3 className="text-2xl font-bold text-[#1E90FF] mb-4 text-center">
              🧭 Tu Progreso
            </h3>

            <div className="mb-6">
              <p className="text-base font-medium text-gray-700">
                Progreso general
              </p>
              <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                <div className="bg-green-500 h-4 rounded-full w-[65%] transition-all duration-500" />
              </div>
              <p className="text-sm text-gray-600 mt-1 text-right">
                65% completado
              </p>
            </div>

            <div className="mb-6">
              <p className="text-base font-medium text-gray-700">
                📅 Próxima evaluación
              </p>
              <p className="text-lg text-[#2F3542] font-semibold mt-1">
                Viernes 10 de mayo
              </p>
              <p className="text-sm text-[#747D8C]">Tema: Ciencia</p>
            </div>

            <div>
              <p className="text-base font-medium text-gray-700">
                🎉 Logros recientes
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[#2F3542] list-disc list-inside">
                <li>✅ ¡Superaste el nivel 1 en Tecnología!</li>
                <li>📖 ¡Terminaste el módulo de Lectura!</li>
                <li>🔢 ¡Resolviste 10 problemas matemáticos!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoEstudiante;
