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
import { useState, useEffect } from "react";

const mockGrades = [
    { month: "Set", math: 20, literature: 5, science: 15, technology: 25 },
    { month: "Oct", math: 45, literature: 25, science: 30, technology: 50 },
    { month: "Nov", math: 65, literature: 50, science: 45, technology: 70 },
    { month: "Dic", math: 80, literature: 75, science: 70, technology: 92 },
];

const PrincipalEst = () => {
    const nombreUsuario = localStorage.getItem("name") || "Usuario";
    const backgroundImageURL = "/imagenes/Dash1.png"; // Ruta a tu imagen en la carpeta public
    const [backgroundOpacity, setBackgroundOpacity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            // Iniciar el desvanecimiento
            setBackgroundOpacity(0);

            // Después de un tiempo, hacer que la imagen vuelva a aparecer
            setTimeout(() => {
                setBackgroundOpacity(1);
            }, 5000); // Duración del fondo desvanecido (más lento)
        }, 10000); // Intervalo entre los ciclos (más lento)

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative min-h-screen p-4 font-[Comic_Sans_MS] overflow-hidden principal-background-container"
        >
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
                        transition: opacity 5s ease; /* Solo transición de opacidad */
                        z-index: -1; /* Place the background behind the content */
                    }
                    .subject-card-glow {
                        box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
                        opacity: 0;
                        transition: opacity 0.3s ease-in-out;
                        border-radius: 0.5rem;
                    }
                    .subject-card:hover .subject-card-glow {
                        opacity: 1;
                    }
                    .animate-bounce-slow-alt {
                        animation: bounce 3s infinite alternate;
                    }
                    @keyframes bounce-slow-alt {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-10px); }
                    }
                `}
            </style>

            {/* Emojis decorativos */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute text-6xl animate-bounce-slow-alt left-5 top-10 opacity-40 text-yellow-700">⭐</div>
                <div className="absolute text-5xl animate-float right-10 top-20 opacity-30 text-yellow-400">☁️</div>
                <div className="absolute text-7xl animate-pulse left-1/2 top-1/3 opacity-20 text-yellow-800">✨</div>
                <div className="absolute text-5xl animate-float-slow right-1/4 bottom-20 opacity-30 text-yellow-500">📚</div>
                <div className="absolute text-6xl animate-bounce-fast left-1/4 bottom-10 opacity-30 text-yellow-900">🎉</div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10">
                <h1 className="text-4xl text-center py-6 text-amber-600 font-bold animate-bounce">
                    🎉 ¡Bienvenido Estudiante, {nombreUsuario}!
                </h1>
                <h5 className="text-center text-xl mb-8 text-sky-700">
                    Estamos felices de tenerte aquí en <span className="font-bold text-fuchsia-600">Pedro Paulet</span>.
                </h5>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-violet-700">🚀 Mi aprendizaje</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {/* ... tus SubjectCards ... */}
                        <div className="rounded-2xl p-4 bg-blue-200 hover:scale-105 transition-transform shadow-xl border-4 border-blue-300 relative overflow-hidden subject-card">
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs text-gray-500">{80}%</div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="p-3 rounded-full bg-blue-400 shadow-inner text-3xl text-white mb-2 animate-pulse-slow">
                                    <Calculator size={36} />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-700">Matemáticas</h3>
                                <div className="w-full bg-blue-100 rounded-full h-2.5 mt-2 overflow-hidden">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `80%` }}>
                                        <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-white rounded-full shadow-md transform translate-x-1/2" style={{ left: `80%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full subject-card-glow"></div>
                        </div>
                        <div className="rounded-2xl p-4 bg-pink-200 hover:scale-105 transition-transform shadow-xl border-4 border-pink-300 relative overflow-hidden subject-card">
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs text-gray-500">{75}%</div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="p-3 rounded-full bg-pink-400 shadow-inner text-3xl text-white mb-2 animate-pulse-slow">
                                    <Book size={36} />
                                </div>
                                <h3 className="text-lg font-semibold text-pink-700">Letras</h3>
                                <div className="w-full bg-pink-100 rounded-full h-2.5 mt-2 overflow-hidden">
                                    <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `75%` }}>
                                        <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-white rounded-full shadow-md transform translate-x-1/2" style={{ left: `75%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full subject-card-glow"></div>
                        </div>
                        <div className="rounded-2xl p-4 bg-green-200 hover:scale-105 transition-transform shadow-xl border-4 border-green-300 relative overflow-hidden subject-card">
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs text-gray-500">{70}%</div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="p-3 rounded-full bg-green-400 shadow-inner text-3xl text-white mb-2 animate-pulse-slow">
                                    <BoxIcon size={36} />
                                </div>
                                <h3 className="text-lg font-semibold text-green-700">Ciencia</h3>
                                <div className="w-full bg-green-100 rounded-full h-2.5 mt-2 overflow-hidden">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `70%` }}>
                                        <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-white rounded-full shadow-md transform translate-x-1/2" style={{ left: `70%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full subject-card-glow"></div>
                        </div>
                        <div className="rounded-2xl p-4 bg-orange-200 hover:scale-105 transition-transform shadow-xl border-4 border-orange-300 relative overflow-hidden subject-card">
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs text-gray-500">{92}%</div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="p-3 rounded-full bg-orange-400 shadow-inner text-3xl text-white mb-2 animate-pulse-slow">
                                    <Laptop size={36} />
                                </div>
                                <h3 className="text-lg font-semibold text-orange-700">Tecnología</h3>
                                <div className="w-full bg-orange-100 rounded-full h-2.5 mt-2 overflow-hidden">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `92%` }}>
                                        <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-white rounded-full shadow-md transform translate-x-1/2" style={{ left: `92%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full subject-card-glow"></div>
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
                                    <Line
                                        type="monotone"
                                        dataKey="math"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        name="Matemáticas"
                                        dot={<svg className="w-3 h-3 fill-current text-blue-500"><circle cx="1.5" cy="1.5" r="1.5" /></svg>}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="literature"
                                        stroke="#db2777"
                                        strokeWidth={3}
                                        name="Letras"
                                        dot={<svg className="w-3 h-3 fill-current text-pink-600"><path d="M1.5 0.5 L2.5 2.5 L0.5 2.5 Z" /></svg>}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="science"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                        name="Ciencias"
                                        dot={<svg className="w-3 h-3 fill-current text-green-600"><rect x="0" y="0" width="3" height="3" /></svg>}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="technology"
                                        stroke="#ea580c"
                                        strokeWidth={3}
                                        name="Tecnología"
                                        dot={<svg className="w-3 h-3 fill-current text-orange-600"><polygon points="1.5,0 3,3 0,3" /></svg>}
                                    />
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
