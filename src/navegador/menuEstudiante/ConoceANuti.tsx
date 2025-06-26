import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../Providers/UserProvider"; // importa el hook para saber el rol

const paginas = [
  "En un bosque mágico llamado Sumalandia, vivía una ardilla muy curiosa llamada Nuti. A diferencia de otras ardillas, a ella le encantaban los números y los acertijos.",
  "Un día, las flores del bosque comenzaron a marchitarse y los árboles ya no cantaban. Nuti fue a ver al Búho Sabio, quien le dijo que solo la magia del conocimiento podía salvar el bosque.",
  "Nuti decidió buscar niños y niñas con corazones valientes que quisieran ayudarla. Fue así como, después de mucho buscar… ¡te encontró a ti!",
  "Hola, soy Nuti 🐿️ ¡El bosque te necesita! ¿Quieres ayudarme a que vuelva a florecer?",
];

export default function ConoceANuti() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { role } = useUser(); // obtener rol actual

  const avanzar = () => {
    if (index < paginas.length - 1) {
      setIndex(index + 1);
    } else {
      // Ruta con rol (estudiante) para mantener sidebar/navbar
      navigate(`/${role?.toLowerCase()}/juego-nuti`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-lime-200 p-6 text-center font-[Comic_Neue]">
      <div className="max-w-xl bg-white rounded-3xl shadow-xl p-8 space-y-6 border-4 border-pink-300">
        <h2 className="text-2xl font-bold text-pink-600">La historia de Nuti 🐿️</h2>
        <p className="text-lg text-gray-700">{paginas[index]}</p>
        <button
          onClick={avanzar}
          className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-full text-lg shadow-md transition"
        >
          {index === paginas.length - 1 ? "¡Claro que sí, Nuti!" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}

