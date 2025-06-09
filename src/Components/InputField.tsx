import { motion, Variants } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; 

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ElementType;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
  variants: Variants; // <-- ¡Cambia 'object' a 'Variants'!
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  Icon,
  showPasswordToggle = false,
  showPassword,
  onTogglePasswordVisibility,
  variants,
}) => {
  return (
    <motion.div className="relative" variants={variants}>
      <Icon className="w-5 h-5 text-gray-400 absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none" />
      <motion.input
        type={showPasswordToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        className="pl-12 pr-10 w-full py-3 rounded-lg bg-white bg-opacity-10 placeholder-gray-400 text-gray-900 border border-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:bg-opacity-20 transition-all duration-300"
        whileFocus={{
          scale: 1.02,
          boxShadow: "0px 0px 10px rgba(192, 132, 252, 0.4)",
        }}
        transition={{ duration: 0.2 }}
        value={value}
        onChange={onChange}
      />
      {showPasswordToggle && (
        <motion.button
          type="button"
          onClick={onTogglePasswordVisibility}
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
      )}
    </motion.div>
  );
};

export default InputField;