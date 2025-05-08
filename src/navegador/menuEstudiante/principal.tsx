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
  { month: "Set", math: 20, literature: 5, science: 15, technology: 25 },
  { month: "Oct", math: 45, literature: 25, science: 30, technology: 50 },
  { month: "Nov", math: 65, literature: 50, science: 45, technology: 70 },
  { month: "Dic", math: 80, literature: 75, science: 70, technology: 92 },
];

const PrincipalEst = () => {
  const nombreUsuario = localStorage.getItem("name") || "Usuario";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4 font-[Comic_Sans_MS] overflow-hidden">
      {/* Emojis decorativos */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute text-5xl animate-bounce-slow left-5 top-10 opacity-40">🎈</div>
        <div className="absolute text-5xl animate-float right-10 top-20 opacity-30">☁️</div>
        <div className="absolute text-5xl animate-pulse left-1/2 top-1/3 opacity-20">✨</div>
        <div className="absolute text-5xl animate-float-slow right-1/4 bottom-20 opacity-30">🌈</div>
        <div className="absolute text-5xl animate-bounce-fast left-1/4 bottom-10 opacity-30">🎉</div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <h1 className="text-4xl text-center py-6 text-amber-600 font-bold animate-bounce">
          🎉 ¡Bienvenido Estudiante, {nombreUsuario}!
        </h1>
        <h5 className="text-center text-xl mb-8 text-sky-700">
          Estamos felices de tenerte aquí en <span className="font-bold text-fuchsia-600">TechClass</span>.
        </h5>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-violet-700">📚 Mi aprendizaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="rounded-2xl p-4 bg-blue-300 hover:scale-105 transition-transform shadow-xl border-4 border-blue-400">
              <SubjectCard title="Matemáticas" grade={80} icon={Calculator} color="bg-blue-500" />
            </div>
            <div className="rounded-2xl p-4 bg-pink-300 hover:scale-105 transition-transform shadow-xl border-4 border-pink-500">
              <SubjectCard title="Letras" grade={75} icon={Book} color="bg-pink-600" />
            </div>
            <div className="rounded-2xl p-4 bg-green-300 hover:scale-105 transition-transform shadow-xl border-4 border-green-500">
              <SubjectCard title="Ciencia" grade={70} icon={BoxIcon} color="bg-green-600" />
            </div>
            <div className="rounded-2xl p-4 bg-orange-300 hover:scale-105 transition-transform shadow-xl border-4 border-orange-500">
              <SubjectCard title="Tecnología" grade={92} icon={Laptop} color="bg-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-4 border-cyan-200 shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-cyan-800 flex items-center gap-2">
              📈 Avance de mi aprendizaje <span className="animate-bounce text-yellow-500">🌟</span>
            </h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGrades}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="math" stroke="#2563eb" strokeWidth={3} name="Matemáticas" />
                  <Line type="monotone" dataKey="literature" stroke="#db2777" strokeWidth={3} name="Letras" />
                  <Line type="monotone" dataKey="science" stroke="#16a34a" strokeWidth={3} name="Ciencias" />
                  <Line type="monotone" dataKey="technology" stroke="#ea580c" strokeWidth={3} name="Tecnología" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalEst;
