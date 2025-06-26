import { useState } from "react";
import { useNavigate } from "react-router-dom";

const preguntas = [
  {
    pregunta: "¿Cuánto es 3 + 2?",
    opciones: ["4", "5", "6"],
    respuestaCorrecta: "5",
    feedback: "¡Bien hecho! ¡Nuti está feliz! 🐿️💫",
  },
  {
    pregunta: "¿Cuál número es mayor?",
    opciones: ["7", "3", "5"],
    respuestaCorrecta: "7",
    feedback: "¡Correcto! ¡Estás ayudando al bosque! 🌳🌼",
  },
  {
    pregunta: "¿Cuántas ardillas hay? 🐿️🐿️🐿️",
    opciones: ["2", "3", "4"],
    respuestaCorrecta: "3",
    feedback: "¡Eres genial contando! 🎉",
  },
];

export default function JuegoNuti() {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);

  const preguntaActual = preguntas[indice];

  const manejarRespuesta = (opcion: string) => {
    if (opcion === preguntaActual.respuestaCorrecta) {
      setMensaje(preguntaActual.feedback);
      if (indice < preguntas.length - 1) {
        setTimeout(() => {
          setIndice(indice + 1);
          setMensaje("");
        }, 1500);
      } else {
        setTimeout(() => {
          setTerminado(true);
        }, 1500);
      }
    } else {
      setMensaje("¡Ups! Inténtalo de nuevo 🐿️");
    }
  };

  const reiniciarJuego = () => {
    setIndice(0);
    setMensaje("");
    setTerminado(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-lime-200 flex items-center justify-center font-[Comic_Neue] p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-yellow-300 max-w-xl w-full text-center space-y-6 animate-fade-in">
        {!terminado ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-lime-600">
              ¡Ayuda a Nuti! 🐿️
            </h2>
            <p className="text-lg text-gray-800">{preguntaActual.pregunta}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {preguntaActual.opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => manejarRespuesta(opcion)}
                  className="bg-pink-300 hover:bg-pink-400 text-white px-6 py-2 rounded-full shadow-md transition transform hover:scale-105"
                >
                  {opcion}
                </button>
              ))}
            </div>
            {mensaje && <p className="text-md text-green-700 font-semibold">{mensaje}</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-pink-600">¡Gracias por tu ayuda! 🐿️🌟</h2>
            <p className="text-lg text-gray-700">El bosque está floreciendo nuevamente gracias a ti.</p>
            <img
              src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
              alt="Celebración"
              className="w-32 h-32 mx-auto"
            />
            <button
              onClick={reiniciarJuego}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg shadow-md transition"
            >
              Jugar otra vez
            </button>
          </>
        )}
      </div>
    </div>
  );
}
