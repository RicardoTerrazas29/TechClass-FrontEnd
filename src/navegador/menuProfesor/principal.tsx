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

const mockGrades = [
  {
    month: "Sep",
    math: 85,
    literature: 78,
    science: 90,
    technology: 88,
  },
  {
    month: "Oct",
    math: 82,
    literature: 85,
    science: 85,
    technology: 90,
  },
  {
    month: "Nov",
    math: 88,
    literature: 88,
    science: 92,
    technology: 85,
  },
  {
    month: "Dec",
    math: 85,
    literature: 90,
    science: 88,
    technology: 92,
  },
];

const PrincipalPro = () => {
  const nombreUsuario = localStorage.getItem("name") || "Usuario";

  return (
    <div>
      <h1>Bienvenido Profesor, {nombreUsuario}!</h1>
      <h5>Estamos felices de tenerte aquí en TechClass.</h5>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Aprendizaje de mis estudiantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SubjectCard
            title="Matemáticas"
            grade={85}
            icon={Calculator}
            color="bg-blue-500 bg-opacity-90"
          />
          <SubjectCard
            title="Letras"
            grade={90}
            icon={Book}
            color="bg-purple-500 bg-opacity-90"
          />
          <SubjectCard
            title="Ciencia"
            grade={88}
            icon={BoxIcon}
            color="bg-green-500 bg-opacity-90"
          />
          <SubjectCard
            title="Tecnologia"
            grade={92}
            icon={Laptop}
            color="bg-orange-500 bg-opacity-90"
          />
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            Avance de mis estudiantes
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrades}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="math"
                  stroke="#3b82f6"
                  name="Matemáticas"
                />
                <Line
                  type="monotone"
                  dataKey="literature"
                  stroke="#a855f7"
                  name="Letras"
                />
                <Line
                  type="monotone"
                  dataKey="science"
                  stroke="#22c55e"
                  name="Ciencias"
                />
                <Line
                  type="monotone"
                  dataKey="technology"
                  stroke="#f97316"
                  name="Tecnología"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalPro;
