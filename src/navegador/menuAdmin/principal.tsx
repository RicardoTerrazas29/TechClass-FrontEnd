import { Users, UserCheck, ShieldCheck, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

const mockAdminStats = {
  students: 120,
  teachers: 18,
  admins: 3,
  courses: 4,
};

const PrincipalAdm = () => {
  const nombreUsuario = localStorage.getItem("name") || "Administrador";
  const backgroundImageURL = "/imagenes/Admin.png";
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundOpacity(0);
      setTimeout(() => {
        setBackgroundOpacity(1);
      }, 10000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Estudiantes",
      count: mockAdminStats.students,
      icon: <Users size={48} />,
      color: "bg-blue-200",
      border: "border-blue-300",
      text: "text-blue-800",
    },
    {
      label: "Profesores",
      count: mockAdminStats.teachers,
      icon: <UserCheck size={48} />,
      color: "bg-green-200",
      border: "border-green-300",
      text: "text-green-800",
    },
    {
      label: "Administradores",
      count: mockAdminStats.admins,
      icon: <ShieldCheck size={48} />,
      color: "bg-yellow-200",
      border: "border-yellow-300",
      text: "text-yellow-800",
    },
    {
      label: "Cursos",
      count: mockAdminStats.courses,
      icon: <BookOpen size={48} />,
      color: "bg-purple-200",
      border: "border-purple-300",
      text: "text-purple-800",
    },
  ];

  return (
    <div className="relative min-h-screen p-6 z-1 font-[Comic_Sans_MS] overflow-hidden principal-background-container">
      <style>
        {`
          .principal-background-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${backgroundImageURL});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            opacity: ${backgroundOpacity};
            transition: opacity 10s ease;
            z-index: -1;
          }
        `}
      </style>

      {/* Emojis decorativos */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute text-7xl animate-bounce left-5 top-10 opacity-40 text-yellow-700">⚙️</div>
        <div className="absolute text-6xl animate-float right-10 top-20 opacity-30 text-blue-400">📊</div>
        <div className="absolute text-8xl animate-pulse left-1/2 top-1/3 opacity-20 text-purple-800">📈</div>
        <div className="absolute text-6xl animate-float-slow right-1/4 bottom-20 opacity-30 text-green-500">📋</div>
        <div className="absolute text-7xl animate-bounce-fast left-1/4 bottom-10 opacity-30 text-orange-900">🧑‍💼</div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl py-6 font-extrabold animate-bounce leading-tight text-green-700">
          👨‍💼 ¡Hola {nombreUsuario}!
        </h1>
        <h5 className="text-3xl mb-10 font-semibold text-green-700">
          Gracias por ser parte de <span className="font-bold text-green-700">Pedro Paulet</span>.
        </h5>
      </div>

      <div className="p-6 relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-green-700">
          📋 Estadísticas Generales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 ${item.color} hover:scale-105 transition-transform shadow-xl ${item.border} text-center`}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="p-4 rounded-full shadow-inner text-white bg-opacity-70">
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-bold ${item.text}`}>{item.label}</h3>
                <div className="text-5xl font-extrabold text-gray-800">{item.count}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center max-w-4xl mx-auto text-5xl mt-12 font-extrabold leading-snug drop-shadow-md font-['Fredoka'] text-green-700">
          🎉 ¡Tu trabajo es esencial para mantener a todos felices y aprendiendo!<br />
          👏 ¡Sigue así, {nombreUsuario}! 💪
        </p>
      </div>
    </div>
  );
};

export default PrincipalAdm;





