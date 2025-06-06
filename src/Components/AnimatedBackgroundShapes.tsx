import { motion } from "framer-motion";

const AnimatedBackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 opacity-20 rounded-full filter blur-3xl"
        animate={{
          x: ["-15vw", "0vw", "15vw", "0vw", "-15vw"],
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
  );
};

export default AnimatedBackgroundShapes;