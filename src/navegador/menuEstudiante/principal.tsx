import {
  Book,
  Calculator,
  Laptop,
  BoxIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import SubjectCard from "./components/SubjectCard";
import AchievementCard from "./components/AchievementCard";
import BackgroundDecor from "./components/BackgroundDecor";
import MissionCard from "./components/MissionCard";

const PrincipalEst = () => {
  const nombreUsuario = localStorage.getItem("name") || "Usuario";
  const backgroundImageURL = "/imagenes/Dash1.png";
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundOpacity(0);
      setTimeout(() => {
        setBackgroundOpacity(1);
      }, 5000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen p-4 z-1 font-[Comic_Sans_MS] overflow-hidden principal-background-container">
      <style>
        {`
          @keyframes bounce-slow-alt {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes bounce-fast {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @keyframes move-squirrel {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(calc(100vw + 100%)); }
          }
          .principal-background-container::before {
            content: "";
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-image: url(${backgroundImageURL});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            opacity: ${backgroundOpacity};
            transition: opacity 5s ease;
            z-index: -1;
          }
          .animate-bounce-slow-alt { animation: bounce-slow-alt 3s infinite alternate; }
          .animate-float { animation: float 2s infinite alternate; }
          .animate-float-slow { animation: float-slow 4s infinite alternate; }
          .animate-bounce-fast { animation: bounce-fast 1.5s infinite alternate; }
          .animate-pulse-slow { animation: pulse-slow 2s infinite alternate; }
          .animate-move-squirrel { animation: move-squirrel 20s linear infinite; }
        `}
      </style>

      <BackgroundDecor />
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
  <div className="absolute text-7xl animate-pulse left-5 top-10 opacity-30 text-yellow-500">⚙️</div>
  <div className="absolute text-6xl animate-bounce right-10 top-20 opacity-20 text-blue-300">📊</div>
  <div className="absolute text-8xl animate-pulse left-1/2 top-1/3 opacity-20 text-purple-800">📈</div>
  <div className="absolute text-6xl animate-float-slow right-1/4 bottom-20 opacity-30 text-green-500">📋</div>
  <div className="absolute text-7xl animate-bounce-fast left-1/4 bottom-10 opacity-30 text-orange-900">🧑‍💼</div>

          {/* El águila */}
          <img
            src="/imagenes/aguila2.1.gif" 
            alt="Águila volando"
            className="animate-move-eagle"
          />
          <img
            src="/imagenes/aguila2.1.gif"
            alt="Águila volando inversa"
            className="animate-move-eagle reverse"
          />
        </div>
      <div className="relative z-10">
        <h1 className="text-4xl text-center py-6 text-amber-600 font-bold animate-bounce">
          🎉 ¡Bienvenido Estudiante, {nombreUsuario}!
        </h1>
        <h5 className="text-center text-xl mb-8 text-sky-700">
          Estamos felices de tenerte aquí en{" "}
          <span className="font-bold text-fuchsia-600">Pedro Paulet</span>.
        </h5>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-violet-700">
            🚀 Mi aprendizaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <SubjectCard title="Matemáticas" icon={Calculator} color="blue" percentage={80} />
            <SubjectCard title="Letras" icon={Book} color="pink" percentage={75} />
            <SubjectCard title="Ciencia" icon={BoxIcon} color="green" percentage={70} />
            <SubjectCard title="Tecnología" icon={Laptop} color="orange" percentage={92} />
          </div>

          <div className="bg-white p-6 rounded-3xl border-4 border-yellow-300 shadow-2xl mb-10">
            <h3 className="text-lg font-bold mb-4 text-yellow-700 flex items-center gap-2">
              🏅 Mis logros y recompensas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AchievementCard emoji="🌟" title="Estrella de Matemáticas" description="Por resolver 3 ejercicios seguidos." color="yellow" />
              <AchievementCard emoji="📖" title="Lector Curioso" description="Por leer 5 cuentos en clase." color="pink" />
              <AchievementCard emoji="🔬" title="Explorador Científico" description="Por participar en un experimento." color="green" />
              <AchievementCard emoji="💻" title="Héroe Tecnológico" description="Por completar un juego educativo." color="blue" />
            </div>
          </div>

          <MissionCard mission="¡Resuelve 3 ejercicios de matemáticas para ganar una estrella! ⭐" />

          {/* Ardilla y mensaje flotante */}
          <div className="relative mt-10 w-full h-32">
            {mensajeVisible && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 bg-white p-3 rounded-xl border border-yellow-400 shadow-lg text-sm text-blue-800 font-bold animate-bounce transition duration-300 z-20">
                ¡Sigue aprendiendo, lo estás haciendo genial! 🌟
              </div>
            )}
            <img
              src="/imagenes/ardilla.gif"
              alt="Ardilla caminando"
              className="animate-move-squirrel cursor-pointer"
              onClick={() => {
                setMensajeVisible(true);
                setTimeout(() => setMensajeVisible(false), 4000);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalEst;

