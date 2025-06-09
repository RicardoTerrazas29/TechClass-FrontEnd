import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface AuthOptionsProps {
  variants: Variants; // 
}
const AuthOptions: React.FC<AuthOptionsProps> = ({ variants }) => {
  return (
    <motion.div
      className="flex items-center justify-between text-gray-300 text-sm mb-8 mt-6"
      variants={variants}
    >
      <label className="inline-flex items-center group cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-purple-500 bg-white bg-opacity-20 border-gray-500 rounded focus:ring-purple-500 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-1"
        />
        <motion.span
          className="ml-2 text-black transition-colors group-hover:text-purple-300"
          whileHover={{ x: 1 }}
        >
          Recuérdame
        </motion.span>
      </label>
      <motion.div variants={variants}>
        <Link
          to="/clave-olvidada"
          className="text-black hover:underline hover:text-purple-300 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AuthOptions;