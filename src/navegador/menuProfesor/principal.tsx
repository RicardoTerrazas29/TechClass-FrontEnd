import { useState, useEffect } from "react";
import {
    Book,
    Calculator,
    Laptop,
    BoxIcon,
    FileText,
    Clock3,
    Award,
} from "lucide-react";

const mockAgenda = [
    {
        date: "15 Mayo",
        title: "📝 Examen de Matemáticas",
        icon: <FileText className="text-red-500 w-8 h-8" />,
        type: "Examen",
        time: "10:00 AM",
    },
    {
        date: "17 Mayo",
        title: "📚 Revisión de tareas de Ciencia",
        icon: <Clock3 className="text-blue-500 w-8 h-8" />,
        type: "Tarea",
        time: "2:00 PM",
    },
    {
        date: "20 Mayo",
        title: "💻 Clase de Tecnología - Aula 3",
        icon: <Laptop className="text-orange-500 w-8 h-8" />,
        type: "Clase",
        time: "8:30 AM",
    },
    {
        date: "22 Mayo",
        title: "🎉 Feria escolar de ciencias",
        icon: <Award className="text-green-600 w-8 h-8" />,
        type: "Evento",
        time: "11:00 AM",
    },
];

const SubjectCard = ({ title, grade, icon: Icon, color }) => {
    return (
        <div
            className={`p-5 rounded-2xl text-white shadow-2xl border-2 border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:border-yellow-400 animate-fade-in ${color}`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 group">
                    <Icon className="w-6 h-6 group-hover:animate-spin-slow" />
                    <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <span className="text-lg font-extrabold">{grade}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
                <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${grade}%` }}
                ></div>
            </div>
        </div>
    );
};

const PrincipalPro = () => {
    const nombreUsuario = localStorage.getItem("name") || "Usuario";
    const backgroundImageURL = "/imagenes/Profesor.png";
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

                    @keyframes spin {
                        100% { transform: rotate(360deg); }
                    }

                    .animate-spin-slow {
                        animation: spin 3s linear infinite;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-in-out;
                    }

                    @keyframes moveSquirrel {
                        0% {
                            left: -150px;
                        }
                        50% {
                            left: 50%;
                            transform: translateX(-50%);
                        }
                        100% {
                            left: 110%;
                        }
                    }

                    .animate-move-squirrel {
                        position: fixed;
                        bottom: 20px;
                        width: 150px;
                        height: 150px;
                        animation: moveSquirrel 15s linear infinite;
                        z-index: 100;
                        pointer-events: none;
                    }
                `}
            </style>

            <div className="relative z-10 text-center text-Green-700">
                <h1 className="text-3xl md:text-4xl font-bold py-4">
                    ¡Bienvenido Profesor, {nombreUsuario}!
                </h1>
                <h5 className="text-lg md:text-xl text-Green-700 mb-6">
                    Estamos felices de tenerte aquí en Pedro Paulet.
                </h5>
            </div>

            <div className="relative z-10 p-6">
                <h2 className="text-2xl font-bold mb-6 text-Green-700 text-center">
                    Aprendizaje de mis estudiantes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <SubjectCard
                        title="Matemáticas"
                        grade={85}
                        icon={Calculator}
                        color="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500"
                    />
                    <SubjectCard
                        title="Letras"
                        grade={90}
                        icon={Book}
                        color="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400"
                    />
                    <SubjectCard
                        title="Ciencia"
                        grade={88}
                        icon={BoxIcon}
                        color="bg-gradient-to-r from-green-600 via-green-400 to-green-500"
                    />
                    <SubjectCard
                        title="Tecnología"
                        grade={92}
                        icon={Laptop}
                        color="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400"
                    />
                </div>

                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-yellow-300 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        📅 Agenda del Profesor
                    </h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {mockAgenda.map((item, index) => {
                            let cardStyle = "";
                            switch (item.type) {
                                case "Examen":
                                    cardStyle = "from-red-100 via-red-50 to-white border-red-300";
                                    break;
                                case "Tarea":
                                    cardStyle = "from-blue-100 via-blue-50 to-white border-blue-300";
                                    break;
                                case "Clase":
                                    cardStyle = "from-orange-100 via-yellow-50 to-white border-orange-300";
                                    break;
                                case "Evento":
                                    cardStyle = "from-green-100 via-green-50 to-white border-green-300";
                                    break;
                                default:
                                    cardStyle = "from-gray-100 via-gray-50 to-white border-gray-300";
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex items-start gap-4 bg-gradient-to-br ${cardStyle} p-5 rounded-2xl border shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300`}
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">{item.date}</span> — {item.time}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full 
                                                ${
                                                    item.type === "Examen"
                                                        ? "bg-red-200 text-red-800"
                                                        : item.type === "Tarea"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : item.type === "Clase"
                                                        ? "bg-orange-200 text-orange-800"
                                                        : item.type === "Evento"
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Ardilla animada caminando */}
            <img
                src="/imagenes/Ardilla 3.gif"
                alt="Ardilla caminando"
                className="animate-move-squirrel"
            />
        </div>
    );
};

export default PrincipalPro;











