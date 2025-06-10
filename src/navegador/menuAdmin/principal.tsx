// navegador/menuAdmin/principal.tsx
import { Users, UserCheck, ShieldCheck, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import StatCard from "../../Components/StatCard"; 

// 1. Define la interfaz para la estructura de tus estadísticas
interface AdminStats {
  students: number;
  teachers: number;
  admins: number;
  courses: number;
}

// 2. Simulación de una llamada a la API
// Indicamos que la promesa resuelve a un tipo AdminStats
const fetchAdminStats = async (): Promise<AdminStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ // Asegúrate de que los datos aquí coincidan con la interfaz AdminStats
        students: 120,
        teachers: 18,
        admins: 3,
        courses: 4,
      });
    }, 500); // Simula un retraso de API
  });
};


const PrincipalAdm = () => {
  // Estados para manejar los datos de las estadísticas, carga y errores
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null); // adminStats puede ser AdminStats o null
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando
  const [error, setError] = useState<string | null>(null); // Almacena cualquier mensaje de error

  const nombreUsuario = localStorage.getItem("name") || "Administrador";
  const backgroundImageURL = "/imagenes/Admin.png";

  // useEffect para cargar las estadísticas al montar el componente
  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchAdminStats(); // 'data' es inferido como AdminStats gracias al tipo de retorno de fetchAdminStats
        setAdminStats(data); // Esto ya no dará error de tipo 'unknown'
      } catch (err: unknown) { // Captura el error como 'unknown' (tipo seguro en TS)
        if (err instanceof Error) {
            setError(`Error al cargar las estadísticas: ${err.message}`);
        } else {
            setError("Error desconocido al cargar las estadísticas.");
        }
        console.error("Error al obtener las estadísticas del administrador:", err);
      } finally {
        setLoading(false); // Siempre termina la carga, incluso si hay un error
      }
    };
    getStats();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar (al cargar el componente)


  // Define la configuración de las tarjetas usando los datos cargados (adminStats)
  // Utiliza las nuevas propiedades 'gradientColors' y 'textColor' que espera el StatCard.
  const statsConfig = adminStats ? [ // Solo si adminStats no es null
    {
      label: "Estudiantes",
      count: adminStats.students, // Accede a los datos cargados
      icon: <Users size={40} />, // Tamaño de ícono ligeramente más pequeño para el nuevo diseño
      gradientColors: "bg-gradient-to-br from-blue-400 to-blue-600", // Clases de gradiente de Tailwind
      textColor: "text-blue-100", // Color del texto del ícono dentro de la tarjeta
    },
    {
      label: "Profesores",
      count: adminStats.teachers,
      icon: <UserCheck size={40} />,
      gradientColors: "bg-gradient-to-br from-green-400 to-green-600",
      textColor: "text-green-100",
    },
    {
      label: "Administradores",
      count: adminStats.admins,
      icon: <ShieldCheck size={40} />,
      gradientColors: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      textColor: "text-yellow-100",
    },
    {
      label: "Cursos",
      count: adminStats.courses,
      icon: <BookOpen size={40} />,
      gradientColors: "bg-gradient-to-br from-purple-400 to-purple-600",
      textColor: "text-purple-100",
    },
  ] : []; // Si adminStats es null (aún cargando o hay un error), es un array vacío para evitar errores de mapeo


  return (
    // CAMBIO EN EL FONDO: Usaremos un fondo estático con un overlay para mejor legibilidad.
    // Esto es más limpio que el <style> tag y el useEffect de opacidad.
    <div
      className="relative min-h-screen p-6 font-sans overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageURL})` }} // Fondo aplicado directamente
    >
      {/* Superposición sutil para una mejor legibilidad del texto */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* ELIMINA ESTE BLOQUE <style> si ya no usas el useEffect de opacidad para el fondo */}
      {/* <style>
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
      </style> */}


      {/* Emojis decorativos (mantén si te gusta, ajusta opacidades si es necesario) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute text-7xl animate-pulse left-5 top-10 opacity-30 text-yellow-500">⚙️</div>
        <div className="absolute text-6xl animate-bounce right-10 top-20 opacity-20 text-blue-300">📊</div>
        <div className="absolute text-8xl animate-pulse left-1/2 top-1/3 opacity-20 text-purple-800">📈</div>
        <div className="absolute text-6xl animate-float-slow right-1/4 bottom-20 opacity-30 text-green-500">📋</div>
        <div className="absolute text-7xl animate-bounce-fast left-1/4 bottom-10 opacity-30 text-orange-900">🧑‍💼</div>
      </div>

         {/* Emojis decorativos y ahora el águila */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">

        {/* ¡Aquí va el águila! */}
        <img
          src="/imagenes/aguila2.1.gif" 
          alt="Águila volando"
          className="animate-move-eagle"
        />

        {/* Opcional: Otra águila volando en dirección contraria */}
        <img
          src="/imagenes/aguila2.1.gif" // 
          alt="Águila volando inversa"
          className="animate-move-eagle reverse" // Aplica la clase 'reverse' para la animación inversa
        />

      </div>
      {/* Títulos y mensaje de bienvenida */}
      {/* CAMBIO: Colores de texto ajustados para el overlay de fondo, y fuente */}
      <div className="relative z-0 text-center text-white"> {/* Texto blanco para contrastar con el overlay oscuro */}
        <h1 className="text-5xl md:text-6xl py-6 font-extrabold leading-tight drop-shadow-lg text-white">
          👨‍💼 ¡Hola {nombreUsuario}!
        </h1>
        <h5 className="text-2xl md:text-3xl mb-10 font-semibold drop-shadow text-white">
          Gracias por ser parte de <span className="font-bold">Pedro Paulet</span>.
        </h5>
      </div>

      <div className="p-6 relative z-0">
        {/* CAMBIO: Color de texto ajustado para el overlay de fondo */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          📋 Estadísticas Generales
        </h2>

        {/* Lógica de carga, error y renderizado de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading && (
            // Esqueletos de carga mientras se obtienen los datos
            [...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl p-6 bg-gray-200 animate-pulse h-48"></div>
            ))
          )}

          {error && (
            // Mensaje de error si la carga falla
            <p className="text-center text-red-500 text-xl font-bold">{error}</p>
          )}

          {!loading && !error && (
            // ************ ESTA ES LA SECCIÓN CLAVE PARA USAR StatCard ************
            // Ahora se usa statsConfig y se mapea directamente al componente StatCard.
            statsConfig.map((item, index) => (
              <StatCard
                key={index}
                label={item.label}
                count={item.count}
                icon={item.icon}
                gradientColors={item.gradientColors}
                textColor={item.textColor}
              />
            ))
          )}
        </div>

        {/* Mensaje final */}
        {/* CAMBIO: Color de texto ajustado para el overlay de fondo, y fuente */}
        <p className="text-center max-w-4xl mx-auto text-4xl md:text-5xl mt-12 font-extrabold leading-snug drop-shadow-md text-white">
          🎉 ¡Tu trabajo es esencial para mantener a todos felices y aprendiendo!<br />
          👏 ¡Sigue así, {nombreUsuario}! 💪
        </p>
      </div>
    </div>
  );
};

export default PrincipalAdm;