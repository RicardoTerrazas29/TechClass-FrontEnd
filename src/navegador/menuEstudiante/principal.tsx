import { SubjectCard } from "../../Components/SubjectCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Book, Calculator, Laptop, BoxIcon } from "lucide-react";
import MissionCard from "../../Components/MissionCard";
import Lottie from "lottie-react";
import studyAnimation from "../../assets/lotties/study-boy.json"; // Asegúrate de tener este archivo

const mockGrades = [
  {
    month: "Set",
    math: 20,
    literature: 5,
    science: 15,
    technology: 25,
  },
  {
    month: "Oct",
    math: 45,
    literature: 25,
    science: 30,
    technology: 50,
  },
  {
    month: "Nov",
    math: 65,
    literature: 50,
    science: 45,
    technology: 70,
  },
  {
    month: "Dic",
    math: 80,
    literature: 75,
    science: 70,
    technology: 92,
  },
];

const PrincipalEst = () => {
  const nombreUsuario = localStorage.getItem("name") || "Usuario";

  return (
    <div className="font-primary bg-[#F1F2F6] min-h-screen p-6 text-[#2F3542]">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 pt-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">¡Hola {nombreUsuario}! 👋</h1>
          <h5 className="text-lg text-gray-700 mb-6">
            ¡Bienvenido a{" "}
            <span className="text-purple-500 font-semibold">TechClass</span>! Tu
            lugar para aprender jugando 🎉
          </h5>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 mb-4">
          Mi aprendizaje
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SubjectCard
            title="Matemáticas"
            grade={80}
            icon={Calculator}
            color="bg-blue-400 bg-opacity-90 rounded-3xl hover:scale-105 transition"
          />
          <SubjectCard
            title="Letras"
            grade={75}
            icon={Book}
            color="bg-purple-500 bg-opacity-90 rounded-3xl hover:scale-105 transition"
          />
          <SubjectCard
            title="Ciencia"
            grade={70}
            icon={BoxIcon}
            color="bg-green-500 bg-opacity-90 rounded-3xl hover:scale-105 transition"
          />
          <SubjectCard
            title="Tecnologia"
            grade={92}
            icon={Laptop}
            color="bg-orange-500 bg-opacity-90 rounded-3xl hover:scale-105 transition"
          />
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-3xl border shadow-lg">
          <h3 className="text-xl font-bold text-center text-green-600 mb-4">
            📊 ¡Mira cómo has mejorado!
          </h3>
          <div className="h-[400px] w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockGrades}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid stroke="#fcd34d" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="math"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Matemáticas"
                />
                <Line
                  type="monotone"
                  dataKey="literature"
                  stroke="#a855f7"
                  strokeWidth={3}
                  name="Letras"
                />
                <Line
                  type="monotone"
                  dataKey="science"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Ciencias"
                />
                <Line
                  type="monotone"
                  dataKey="technology"
                  stroke="#f97316"
                  strokeWidth={3}
                  name="Tecnología"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 pt-3 text-center text-lg text-green-700 font-semibold">
            ¡Estás progresando muy bien! 🌟 ¡Sigue así!
          </p>
        </div>
      </div>

      <MissionCard mission="¡Resuelve 3 ejercicios de matemáticas para ganar una estrella! ⭐" />
    </div>
  );
};

export default PrincipalEst;
