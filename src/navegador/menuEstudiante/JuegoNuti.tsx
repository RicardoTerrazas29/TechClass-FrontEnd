import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bancosDePreguntas = [
  [
    { pregunta: "¿Cuánto es 3 + 2?", opciones: ["4", "5", "6"], respuestaCorrecta: "5", feedback: "¡Bien hecho! ¡Nuti está feliz! 🐿️💫" },
    { pregunta: "¿Cuál número es mayor?", opciones: ["7", "3", "5"], respuestaCorrecta: "7", feedback: "¡Correcto! ¡Estás ayudando al bosque! 🌳🌼" },
    { pregunta: "¿Cuántas ardillas hay? 🐿️🐿️🐿️", opciones: ["2", "3", "4"], respuestaCorrecta: "3", feedback: "¡Eres genial contando! 🎉" },
  ],
  [
    { pregunta: "¿Cuánto es 4 + 1?", opciones: ["4", "6", "5"], respuestaCorrecta: "5", feedback: "¡Genial! 🐿️🌟" },
    { pregunta: "¿Qué número viene después del 2?", opciones: ["1", "3", "4"], respuestaCorrecta: "3", feedback: "¡Vas muy bien! 🍀" },
    { pregunta: "¿Cuánto es 10 - 7?", opciones: ["2", "3", "4"], respuestaCorrecta: "3", feedback: "¡Así se hace! 🌼" },
  ],
  [
    { pregunta: "¿Cuánto es 2 x 2?", opciones: ["2", "4", "6"], respuestaCorrecta: "4", feedback: "¡Muy bien! 🌻" },
    { pregunta: "¿Cuántas patas tiene una araña?", opciones: ["6", "8", "4"], respuestaCorrecta: "8", feedback: "¡Excelente observador! 🕷️" },
    { pregunta: "¿Qué número es menor?", opciones: ["1", "9", "5"], respuestaCorrecta: "1", feedback: "¡Bien pensado! 🧠" },
  ],
  [
    { pregunta: "¿Cuánto es 6 ÷ 2?", opciones: ["3", "2", "4"], respuestaCorrecta: "3", feedback: "¡Lo estás haciendo genial! 🥳" },
    { pregunta: "¿Cuál es la mitad de 10?", opciones: ["4", "6", "5"], respuestaCorrecta: "5", feedback: "¡Perfecto! 🎯" },
    { pregunta: "¿Cuánto es 1 + 6?", opciones: ["6", "7", "8"], respuestaCorrecta: "7", feedback: "¡Muy inteligente! 📘" },
  ],
  [
    { pregunta: "¿Cuántas estaciones hay en un año?", opciones: ["3", "4", "5"], respuestaCorrecta: "4", feedback: "¡Bien! 🍂☀️❄️🌸" },
    { pregunta: "¿Cuánto es 9 - 4?", opciones: ["6", "5", "4"], respuestaCorrecta: "5", feedback: "¡Muy bien resuelto! 🧩" },
    { pregunta: "¿Cuánto es 2 + 5?", opciones: ["6", "7", "8"], respuestaCorrecta: "7", feedback: "¡Correcto! 🧠✨" },
  ],
  [
    { pregunta: "¿Qué número viene antes del 10?", opciones: ["9", "8", "7"], respuestaCorrecta: "9", feedback: "¡Casi terminas! 🎉" },
    { pregunta: "¿Cuánto es 3 x 2?", opciones: ["5", "6", "7"], respuestaCorrecta: "6", feedback: "¡Muy bien! 🐾" },
    { pregunta: "¿Cuánto es 8 - 3?", opciones: ["5", "4", "6"], respuestaCorrecta: "5", feedback: "¡Has completado la misión! 🌳🌼" },
  ],
];

export default function JuegoNuti() {
  const navigate = useNavigate();
  const [ronda, setRonda] = useState(0);
  const [indice, setIndice] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);
  const preguntas = bancosDePreguntas[ronda];
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

  const jugarOtraVez = () => {
    if (ronda < bancosDePreguntas.length - 1) {
      setRonda(ronda + 1);
      setIndice(0);
      setMensaje("");
      setTerminado(false);
    } else {
      navigate("/estudiante/principal");
    }
  };

  const mostrarImagen = () => {
    const partes = Array.from({ length: 6 }, (_, i) => {
      const desbloqueado = i <= ronda;
      const col = i % 3;
      const row = Math.floor(i / 3);
      return (
        <div
          key={i}
          className={`absolute border-[1px] border-white ${desbloqueado ? "blur-0" : "blur-sm"}`}
          style={{
            width: "33.3333%",
            height: "50%",
            top: `${row * 50}%`,
            left: `${col * 33.3333}%`,
            backgroundImage: `url(/imagenes/bosque.png)` ,
            backgroundSize: `300% 200%`,
            backgroundPosition: `${col * 50}% ${row * 100}%`,
          }}
        ></div>
      );
    });
    return (
      <div className="relative w-full h-[80vh] mb-6 overflow-hidden rounded-xl shadow-xl" style={{ maxWidth: "100%" }}>
        {partes}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-lime-200 flex flex-col items-center justify-center font-[Comic_Neue] p-6">
      {terminado && mostrarImagen()}

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
            <h2 className="text-2xl font-bold text-pink-600">
              {ronda < 5 ? "¡Gracias por tu ayuda! 🐿️🌟" : "¡Misión completada! 🎉🌳"}
            </h2>
            <p className="text-lg text-gray-700">
              {ronda < 5 ? "El bosque está floreciendo nuevamente gracias a ti." : "El bosque floreció por completo gracias a tu esfuerzo."}
            </p>
            <button
              onClick={jugarOtraVez}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg shadow-md transition"
            >
              {ronda < 5 ? "Seguir ayudando al bosque 🍃" : "¡Gracias por jugar! 🐿️"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}





