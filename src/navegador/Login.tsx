import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider"; // Asegúrate de tener el import correcto
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


// Importación de íconos desde Heroicons
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setRole } = useUser(); // 👈 obtenemos el setRole del contexto
  const [showPassword, setShowPassword] = useState(false);
  // Imágenes de fondo
  const bgImages = [
    "/imagenes/background.jpg",
    "/imagenes/fondo2.jpg",
    "/imagenes/fondo3.jpg",
    "/imagenes/fondo4.jpg",
  ];
  // Estado local para la imagen de fondo actual
  const [currentBg, setCurrentBg] = useState(0);

  // Ciclo de cambio de fondo
  useEffect(() => {
    if (bgImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % bgImages.length);
      }, 7000); // El tiempo sigue siendo 7 segundos
      return () => clearInterval(timer);
    }
  }, [bgImages.length]);

  // Variants para el contenedor del formulario y sus hijos
  const formContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren", // Animar hijos después de que el padre sea visible
        staggerChildren: 0.15, // Tiempo de desfase entre animaciones de hijos
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
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") navigate("/admin");
    else if (role === "PROFESOR") navigate("/profesor");
    else if (role === "ESTUDIANTE") navigate("/estudiante");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Error al iniciar sesión");

      const data = await res.json();
      console.log(data);

      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      if (data.idProfesor) {
        localStorage.setItem("idProfesor", data.idProfesor);
      }

      if (data.idEstudiante) {
        localStorage.setItem("idEstudiante", data.idEstudiante);
      }

      if (data.genero) {
        localStorage.setItem("genero", data.genero);
      }

      setRole(data.role); // 👈 actualizamos el contexto con el nuevo rol

      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "PROFESOR") navigate("/profesor");
      else if (data.role === "ESTUDIANTE") navigate("/estudiante");
    } catch (error) {
      alert("Hubo un problema al iniciar sesión. Intenta nuevamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Slideshow de imágenes de fondo */}
      <AnimatePresence mode="wait">
        {" "}
        {/* mode="wait" puede ayudar a transiciones más limpias */}
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

      {/* Formas decorativas animadas mejoradas */}
      <div className="absolute inset-0 overflow-hidden">
        {" "}
        {/* Añadido overflow-hidden para contener las formas */}
        <motion.div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 opacity-20 rounded-full filter blur-3xl"
          animate={{
            x: ["-15vw", "0vw", "15vw", "0vw", "-15vw"], // Usar vw/vh para adaptabilidad
            y: ["0vh", "15vh", "0vh", "-15vh", "0vh"],
            scale: [1, 1.1, 1, 0.9, 1],
            rotate: [0, 60, 120, 180, 240, 300, 360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "5%", left: "5%" }}
        />
        <motion.div
          className="absolute w-60 h-60 sm:w-80 sm:h-80 bg-teal-500 opacity-15 rounded-full filter blur-3xl"
          animate={{
            x: ["10vw", "-5vw", "10vw"],
            y: ["-10vh", "5vh", "-10vh"],
            scale: [1, 0.9, 1, 1.1, 1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            delay: 7,
          }}
          style={{ bottom: "10%", right: "10%" }}
        />
        <motion.div
          className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-pink-500 opacity-25 rounded-full filter blur-2xl"
          animate={{
            x: ["5vw", "-5vw", "5vw"],
            y: ["-5vh", "5vh", "-5vh"],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ top: "40%", left: "40%" }}
        />
      </div>

      {/* Contenedor del formulario animado */}
      <motion.div
        // Fondo del formulario blanco semi-transparente
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
            rotate: [0, 8, -8, 8, 0], // Keyframes para la sacudida
          }}
          transition={{
            duration: 0.6,
            type: "tween", // <-- CORREGIDO: Usar 'tween' para múltiples keyframes
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

        {/* Formulario */}
        <form className="space-y-6">
          {/* Correo electrónico */}
          <motion.div className="relative" variants={formItemVariants}>
            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none" />
            <motion.input
              type="email"
              placeholder="Correo electrónico"
              // Borde visible por defecto (border-gray-500)
              className="pl-12 pr-4 w-full py-3 rounded-lg bg-white bg-opacity-10 placeholder-gray-400 text-gray-900 border border-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-opacity-20 transition-all duration-300"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0px 0px 10px rgba(192, 132, 252, 0.4)",
              }}
              transition={{ duration: 0.2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          {/* Contraseña */}
          <motion.div className="relative" variants={formItemVariants}>
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none" />
            <motion.input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              // Borde visible por defecto (border-gray-500)
              className="pl-12 pr-10 w-full py-3 rounded-lg bg-white bg-opacity-10 placeholder-gray-400 text-gray-900 border border-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-opacity-20 transition-all duration-300"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0px 0px 10px rgba(192, 132, 252, 0.4)",
              }}
              transition={{ duration: 0.2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none text-gray-400 hover:text-white p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </motion.button>
          </motion.div>

          {/* Recuérdame y olvido */}
          <motion.div
            className="flex items-center justify-between text-gray-300 text-sm"
            variants={formItemVariants}
          >
            <label className="inline-flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-500 bg-white bg-opacity-20 border-gray-500 rounded focus:ring-purple-500 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-1"
              />
              <motion.span
                // Color "Recuérdame" es negro (text-black)
                className="ml-2 text-black transition-colors group-hover:text-purple-300"
                whileHover={{ x: 1 }}
              >
                Recuérdame
              </motion.span>
            </label>
            <motion.div variants={formItemVariants}>
              <Link
                to="/clave-olvidada"
                className="text-black hover:underline hover:text-purple-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </motion.div>

          </motion.div>

          {/* Botón Ingresar animado */}
          <motion.button
            type="submit"
            variants={formItemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow:
                "0px 0px 15px rgba(236, 72, 153, 0.5), 0px 0px 15px rgba(168, 85, 247, 0.5)", // Glow de ambos colores del gradiente
              transition: { duration: 0.3, type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-white text-lg shadow-md hover:shadow-lg"
          >
            Ingresar
          </motion.button>
        </form>

        {/* Enlace de Registro (opcional) */}
        {/* <motion.p
          // Color del texto "¿No tienes una cuenta?" se mantiene en gris oscuro (text-gray-700)
          className="mt-8 text-center text-sm text-gray-700"
          variants={formItemVariants}
        >
          ¿No tienes una cuenta?{" "}
          <motion.a
            href="#"
            className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
            whileHover={{ y: -1, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Regístrate aquí
          </motion.a>
        </motion.p> */}
      </motion.div>
    </div>
  );
};

export default Login;
