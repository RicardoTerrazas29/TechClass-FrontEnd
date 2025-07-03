import { useEffect, useState, useRef, useCallback } from "react";
import { NavItem } from "../const/profile";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

type SidebarProps = {
  navigation: NavItem[];
};

const motivationalContent = [
  { message: "🍄 ¡Hola! ¿Listo para aprender algo nuevo?", sound: "/sonidos/v1.mp3" },
  { message: "📚 ¡Estás haciendo un gran trabajo!", sound: "/sonidos/v2.mp3" },
  { message: "✨ Recuerda repasar si tienes dudas.", sound: "/sonidos/v3.mp3" },
  { message: "🧠 Cada pregunta te hace más sabio.", sound: "/sonidos/v4.mp3" },
  { message: "🚀 ¡Sigue así, pequeño genio!", sound: "/sonidos/v5.mp3" },
];

const motivationalContentProfesor = [
  { message: "¡Hola, profes! 👋 ¿Listos para un día lleno de ✨magia educativa✨?", sound: "/sonidos/v2.1.mp3" },
  { message: "Maestros, ¡su misión de hoy es sembrar 🧠sabiduría y cosechar 😊sonrisas!", sound: "/sonidos/v2.2.mp3" },
  { message: "¡Qué bueno verlos! 🍎 Su pasión ilumina el camino de nuestros peques. ¡A brillar! 🌟", sound: "/sonidos/v2.3.mp3" },
  { message: "¡Profes, son unos héroes! 🦸‍♂️ Cada lección es una nueva aventura. 🚀", sound: "/sonidos/v2.4.mp3" },
  { message: "Recuerden: con paciencia y amor, ¡cada alumno es una florecita 🌷 que espera crecer!", sound: "/sonidos/v2.5.mp3" },
];

const motivationalContentAdmin = [
  { message: "¡Hola, Admin! 🚀 La plataforma lista y funcionando. ¡Optimicemos el aprendizaje! 📊", sound: "/sonidos/v3.1.mp3" },
  { message: "Un día más para asegurar que todo fluya. ¡Su gestión es clave! 🔑✨", sound: "/sonidos/v3.2.mp3" },
  { message: "Administrador, ¡su visión mantiene este barco a flote! 🚢🛠️ ¡Gracias", sound: "/sonidos/v3.3.mp3" },
  { message: "¡Bienvenido! Su toque experto garantiza que cada detalle funcione. ✅💻", sound: "/sonidos/v3.4.mp3" },
  { message: "Recuerde: detrás de cada logro de un estudiante, ¡está su gran trabajo! 🏆📈", sound: "/sonidos/v3.5.mp3" },
];

const hongoGif = "/imagenes/hongo.gif";
const MESSAGE_INTERVAL_MS = 5000;

export const Sidebar = ({ navigation }: SidebarProps) => {
  const location = useLocation();
  const { role } = useUser();

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const currentAudioInstanceRef = useRef<HTMLAudioElement | null>(null);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentMotivationalContent = useCallback(() => {
    if (role === "ESTUDIANTE") {
      return motivationalContent;
    } else if (role === "PROFESOR") {
      return motivationalContentProfesor;
    } else if (role === "ADMIN") {
      return motivationalContentAdmin;
    }
    return motivationalContent;
  }, [role]);

  const advanceContentIndex = useCallback(() => {
    const contentArray = getCurrentMotivationalContent();
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentArray.length);
  }, [getCurrentMotivationalContent]);

  const stopMessageTimer = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const resetMessageTimer = useCallback(() => {
    stopMessageTimer();
    intervalIdRef.current = setInterval(() => {
      advanceContentIndex();
    }, MESSAGE_INTERVAL_MS);
  }, [advanceContentIndex, stopMessageTimer]);


  const playNextAudioInQueue = useCallback(async () => {
    console.log(`[playNextAudioInQueue] START: isPlayingRef: ${isPlayingRef.current}, Cola Length: ${audioQueueRef.current.length}`);

    if (isPlayingRef.current) {
      console.log("[playNextAudioInQueue] INFO: Ya hay un audio en reproducción. Esperando a que termine.");
      return;
    }

    if (audioQueueRef.current.length === 0) {
      console.log("[playNextAudioInQueue] INFO: Cola de audios vacía. No hay nada que reproducir.");
      isPlayingRef.current = false;
      currentAudioInstanceRef.current = null;
      resetMessageTimer();
      return;
    }

    isPlayingRef.current = true;
    const nextSoundUrl = audioQueueRef.current.shift();

    if (!nextSoundUrl) {
      console.warn("[playNextAudioInQueue] WARN: nextSoundUrl es nulo inesperadamente después de shift(). Reintentando cola.");
      isPlayingRef.current = false;
      playNextAudioInQueue();
      return;
    }

    console.log(`[playNextAudioInQueue] ATTEMPTING: Reproducir ${nextSoundUrl}. Quedan en cola: ${audioQueueRef.current.length}`);

    if (currentAudioInstanceRef.current) {
      console.log(`[playNextAudioInQueue] INFO: Deteniendo audio anterior (${currentAudioInstanceRef.current.src}) antes de empezar ${nextSoundUrl}.`);
      currentAudioInstanceRef.current.pause();
      currentAudioInstanceRef.current.currentTime = 0;
      currentAudioInstanceRef.current = null;
    }

    stopMessageTimer();

    const audio = new Audio(nextSoundUrl);
    currentAudioInstanceRef.current = audio;

    const onEnded = () => {
      console.log(`[playNextAudioInQueue] ENDED: Audio ${nextSoundUrl} TERMINADO. Quedan en cola: ${audioQueueRef.current.length}`);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      isPlayingRef.current = false;
      currentAudioInstanceRef.current = null;

      if (audioQueueRef.current.length === 0) {
        advanceContentIndex();
      }
      resetMessageTimer();

      playNextAudioInQueue();
    };

    const onError = (e: Event) => {
      console.error(`[playNextAudioInQueue] ERROR: Error al reproducir ${nextSoundUrl}:`, e);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      isPlayingRef.current = false;
      currentAudioInstanceRef.current = null;

      if (audioQueueRef.current.length === 0) {
        advanceContentIndex();
      }
      resetMessageTimer();

      playNextAudioInQueue();
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    try {
      await audio.play();
      console.log(`[playNextAudioInQueue] PLAYING: Audio ${nextSoundUrl} COMENZADO.`);
    } catch (error: any) {
      console.error(`[playNextAudioInQueue] CATCH_ERROR: Error al intentar play() en ${nextSoundUrl}:`, error.message, error);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      isPlayingRef.current = false;
      currentAudioInstanceRef.current = null;

      if (audioQueueRef.current.length === 0) {
        advanceContentIndex();
      }
      resetMessageTimer();

      playNextAudioInQueue();
    }
  }, [advanceContentIndex, resetMessageTimer, stopMessageTimer]);

  const handleHongoClick = useCallback(() => {
    const contentArray = getCurrentMotivationalContent();
    const currentItem = contentArray[currentContentIndex];

    let currentSound = currentItem.sound;
    let currentMessage = currentItem.message;

    console.log(`[handleHongoClick] CLICKED: Encolando "${currentMessage}" (${currentSound}). Índice ANTES del clic: ${currentContentIndex}`);
    audioQueueRef.current.push(currentSound);

    stopMessageTimer();

    if (!isPlayingRef.current) {
        console.log("[handleHongoClick] INFO: No hay audio sonando, iniciando playNextAudioInQueue.");
        playNextAudioInQueue();
    } else {
        console.log("[handleHongoClick] INFO: Audio ya en reproducción, el nuevo audio se añade a la cola.");
    }
  }, [currentContentIndex, getCurrentMotivationalContent, playNextAudioInQueue, stopMessageTimer]);


  // --- useEffect principal para inicialización y reinicio del temporizador ---
  useEffect(() => {
    setCurrentContentIndex(0); // Reinicia el índice al cambiar de rol
    resetMessageTimer(); // Siempre inicia el temporizador automático de mensajes

    // ELIMINAMOS la lógica de reproducción automática del primer audio aquí.
    // Ahora, solo el click en el hongo lo activará.

    return () => {
      stopMessageTimer(); // Limpia el temporizador al desmontar el componente
      // Asegurarse de que cualquier audio en curso se detenga al cambiar de rol o desmontar
      if (currentAudioInstanceRef.current) {
        currentAudioInstanceRef.current.pause();
        currentAudioInstanceRef.current.currentTime = 0;
        currentAudioInstanceRef.current = null;
        isPlayingRef.current = false;
      }
      audioQueueRef.current = []; // Limpiar la cola de audios
    };
  }, [role, resetMessageTimer, stopMessageTimer]); // playNextAudioInQueue y getCurrentMotivationalContent ya no son dependencias aquí


  const displayedContent = getCurrentMotivationalContent();

  return (
    <div className="w-64 bg-gradient-to-br from-yellow-200 to-lime-200 h-full fixed left-0 top-0 shadow-xl font-[Comic_Neue] border-r-4 border-lime-300">
      {/* Tour */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-9 w-9 text-green-500 animate-pulse" />
          <Link
            to={`/${role?.toLowerCase()}/principal`}
            className="text-2xl font-extrabold text-green-700 tracking-wide hover:text-green-500 transition duration-300 text-decoration-none"
          >
            AprendeGenial
          </Link>
        </div>

        <nav className="space-y-2 ">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                id={item.name}
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform bg-gradient-to-r from-green-400 to-yellow-500 text-white shadow-md text-decoration-none ${
                  isActive
                    ? "scale-105 ring-2 ring-green-300"
                    : "hover:scale-105 hover:shadow-sm opacity-80 hover:opacity-100"
                }`}
              >
                <Icon className="h-6 w-6 text-red-600" />
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Nube de mensaje + Hongo */}
      <div className="absolute bottom-6 px-4 text-center" id="hongo">
        {/* Nube */}
        <div className="relative inline-block bg-white text-green-800 font-bold text-base py-3 px-6 rounded-2xl shadow-lg border border-green-300 animate-fade-in">
          {/* Mostramos el mensaje del contenido actual */}
          <span>
            {displayedContent[currentContentIndex]?.message}
          </span>
          {/* Triángulo de la nube */}
          <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
        {/* Imagen del hongo */}
        <img
          src={hongoGif}
          alt="Hongo motivador"
          className="w-36 h-36 mx-auto mt-6 rounded-full shadow-md"
          onClick={handleHongoClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};