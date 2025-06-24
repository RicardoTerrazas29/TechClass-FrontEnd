import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

// Importar los nuevos componentes
import InputField from "../Components/InputField";
import AnimatedBackgroundShapes from "../Components/AnimatedBackgroundShapes";
import AuthOptions from "../Components/AuthOptions";

// Constantes para las URLs y localStorage keys
const API_LOGIN_URL = "http://localhost:8080/auth/login";
const LS_ROLE = "role";
const LS_NAME = "name";
const LS_ID_PROFESOR = "idProfesor";
const LS_ID_ESTUDIANTE = "idEstudiante";
const LS_GENERO = "genero";

// Rutas de navegación
const ROUTES = {
  ADMIN: "/admin",
  PROFESOR: "/profesor",
  ESTUDIANTE: "/estudiante",
};
const bgImages = [
  "/imagenes/background.jpg",
  "/imagenes/fondo2.jpg",
  "/imagenes/fondo3.jpg",
  "/imagenes/fondo4.jpg",
];
// Variants para Framer Motion (se mantienen aquí ya que son específicas del layout general del formulario)
const formContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};
const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();
  const { setRole } = useUser();

  // Función para redirigir basada en el rol
  const redirectToRole = useCallback(
    (role: string) => {
      if (role === "ADMIN") navigate(ROUTES.ADMIN);
      else if (role === "PROFESOR") navigate(ROUTES.PROFESOR);
      else if (role === "ESTUDIANTE") navigate(ROUTES.ESTUDIANTE);
    },
    [navigate]
  );

  // Efecto para el cambio de fondo
  useEffect(() => {
    if (bgImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % bgImages.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, []); // Dependencia eliminada ya que bgImages no cambia

  // Efecto para la redirección inicial si ya hay un rol en localStorage
  useEffect(() => {
    const role = localStorage.getItem(LS_ROLE);
    if (role) {
      redirectToRole(role);
    }
  }, [redirectToRole]);

  // Helper para guardar en localStorage de forma más limpia
  const saveToLocalStorage = (key: string, value: any) => {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, value.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      const res = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        // Mejor manejo de errores del backend
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await res.json();

      // Almacenamiento en localStorage
      saveToLocalStorage(LS_ROLE, data.role);
      saveToLocalStorage(LS_NAME, data.name);
      saveToLocalStorage(LS_ID_PROFESOR, data.idProfesor);
      saveToLocalStorage(LS_ID_ESTUDIANTE, data.idEstudiante);
      saveToLocalStorage(LS_GENERO, data.genero);
      setRole(data.role); // Actualiza el contexto
      redirectToRole(data.role); // Redirige
    } catch (error: any) {
      alert(`Hubo un problema al iniciar sesión: ${error.message}. Intenta nuevamente.`);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Slideshow de imágenes de fondo */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentBg}
          src={bgImages[currentBg]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Superposición oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Formas decorativas animadas */}
      <AnimatedBackgroundShapes />

      {/* Contenedor del formulario animado */}
      <motion.form // Cambiado a motion.form para que onSubmit funcione directamente
        className="relative bg-white bg-opacity-5 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-white border-opacity-10"
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        {/* Logo institucional */}
        <motion.div
          className="flex justify-center mb-6"
          variants={formItemVariants}
          whileHover={{
            scale: 1.15,
            rotate: [0, 8, -8, 8, 0],
          }}
          transition={{
            duration: 0.6,
            type: "tween",
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/401/616/non_2x/student-and-check-mark-icon-and-logo-design-educational-and-institutional-logo-design-template-vector.jpg"
            alt="Logo Institucional"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-white ring-opacity-30 shadow-lg"
          />
        </motion.div>

        {/* Título */}
        <motion.h2
          className="text-center text-black text-3xl sm:text-4xl font-bold mb-8 tracking-tight"
          variants={formItemVariants}
        >
          Bienvenido de Nuevo
        </motion.h2>

        {/* Campos del formulario */}
        <div className="space-y-8">
          <InputField
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            Icon={EnvelopeIcon}
            variants={formItemVariants}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            Icon={LockClosedIcon}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
            variants={formItemVariants}
          />
        </div>

        {/* Recuérdame y olvido de contraseña */}
        <AuthOptions variants={formItemVariants} />

        {/* Botón Ingresar animado */}
        <motion.button
          type="submit"
          variants={formItemVariants}
          whileHover={{
            scale: 1.03,
            boxShadow:
              "0px 0px 15px rgba(236, 72, 153, 0.5), 0px 0px 15px rgba(168, 85, 247, 0.5)",
            transition: { duration: 0.3, type: "spring", stiffness: 300 },
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-white text-lg shadow-md hover:shadow-lg mt-12" // Agregué mt-8
        >
          Ingresar
        </motion.button>
      </motion.form>
    </div>
  );
};
export default Login;