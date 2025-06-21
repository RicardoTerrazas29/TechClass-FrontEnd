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

const hongoGif = "/imagenes/hongo.gif";
const MESSAGE_INTERVAL_MS = 5000; // Define el intervalo de tiempo en una constante

export const Sidebar = ({ navigation }: SidebarProps) => {
  const location = useLocation();
  const { role } = useUser();

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const currentAudioInstanceRef = useRef<HTMLAudioElement | null>(null);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Función para avanzar al siguiente mensaje/audio.
  // Será llamada por el temporizador y por la función de finalización de audio.
  const advanceContentIndex = useCallback(() => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % motivationalContent.length);
  }, []);

  // Función para reiniciar el temporizador de los mensajes
  const resetMessageTimer = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    intervalIdRef.current = setInterval(() => {
      advanceContentIndex(); // Llama a la función para avanzar el índice
    }, MESSAGE_INTERVAL_MS);
  }, [advanceContentIndex]); // Dependencia advanceContentIndex

  // useEffect para el cambio automático de mensajes
  useEffect(() => {
    resetMessageTimer(); // Inicia el temporizador al montar
    return () => {
      // Limpia el temporizador al desmontar el componente
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [resetMessageTimer]);


  const playNextAudioInQueue = async () => {
    console.log(`[playNextAudioInQueue] START: isPlayingRef: ${isPlayingRef.current}, Cola Length: ${audioQueueRef.current.length}`);

    if (isPlayingRef.current) {
        console.log("[playNextAudioInQueue] INFO: Ya hay un audio en reproducción. Esperando a que termine.");
        return;
    }
    
    if (audioQueueRef.current.length === 0) {
        console.log("[playNextAudioInQueue] INFO: Cola de audios vacía. No hay nada que reproducir.");
        isPlayingRef.current = false;
        currentAudioInstanceRef.current = null;
        return;
    }

    isPlayingRef.current = true;
    const nextSoundUrl = audioQueueRef.current.shift(); // Saca el audio de la cola

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

    const audio = new Audio(nextSoundUrl);
    currentAudioInstanceRef.current = audio;

    const onEnded = () => {
        console.log(`[playNextAudioInQueue] ENDED: Audio ${nextSoundUrl} TERMINADO. Quedan en cola: ${audioQueueRef.current.length}`);
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        isPlayingRef.current = false;
        currentAudioInstanceRef.current = null;
        
        // *** CAMBIO CLAVE AQUÍ: Avanza el índice solo cuando el audio ha terminado ***
        advanceContentIndex(); 
        // Y reinicia el temporizador para que el siguiente ciclo comience desde este nuevo índice
        resetMessageTimer();

        playNextAudioInQueue(); // Intenta reproducir el siguiente de la cola
    };

    const onError = (e: Event) => {
        console.error(`[playNextAudioInQueue] ERROR: Error al reproducir ${nextSoundUrl}:`, e);
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        isPlayingRef.current = false;
        currentAudioInstanceRef.current = null;
        
        // Si hay un error, también avanzamos el índice para no quedarnos atascados
        advanceContentIndex();
        resetMessageTimer();

        playNextAudioInQueue(); // Intenta el siguiente a pesar del error
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
      
      // Si play() falla inmediatamente, avanza el índice y reinicia el timer
      advanceContentIndex();
      resetMessageTimer();

      playNextAudioInQueue();
    }
  };

  const handleHongoClick = () => {
    // Al hacer clic, el mensaje visible y el audio encolado SIEMPRE serán el del currentContentIndex actual
    const currentSound = motivationalContent[currentContentIndex].sound;
    const currentMessage = motivationalContent[currentContentIndex].message;

    console.log(`[handleHongoClick] CLICKED: Encolando "${currentMessage}" (${currentSound}). Índice ANTES del clic: ${currentContentIndex}`);
    audioQueueRef.current.push(currentSound);
    
    // Al hacer clic, siempre reiniciamos el temporizador para darle prioridad al clic
    resetMessageTimer();

    if (!isPlayingRef.current) {
        console.log("[handleHongoClick] INFO: No hay audio sonando, iniciando playNextAudioInQueue.");
        playNextAudioInQueue();
    } else {
        console.log("[handleHongoClick] INFO: Audio ya en reproducción, el nuevo audio se añade a la cola.");
    }
    
    // *** CAMBIO CLAVE AQUÍ: NO AVANZAR currentContentIndex inmediatamente ***
    // El avance ahora se gestiona en onEnded/onError o por el temporizador.
  };

  return (
    <div className="w-64 overflow-y-auto bg-gradient-to-br from-yellow-200 to-lime-200 h-screen fixed left-0 top-0 shadow-xl font-[Comic_Neue] border-r-4 border-lime-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="h-9 w-9 text-green-500 animate-pulse" />
          <Link
            to={`/${role?.toLowerCase()}/principal`}
            className="text-2xl font-extrabold text-green-700 tracking-wide hover:text-green-500 transition duration-300 text-decoration-none"
          >
            AprendeGenial
          </Link>
        </div>

        <nav className="space-y-4 ">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
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
      <div className="relative mt-10 px-4 text-center">
        {/* Nube */}
        <div className="relative inline-block bg-white text-green-800 font-bold text-base py-3 px-6 rounded-2xl shadow-lg border border-green-300 animate-fade-in">
          {/* Mostramos el mensaje del contenido actual */}
          <span>{motivationalContent[currentContentIndex].message}</span>
          {/* Triángulo de la nube */}
          <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
        {/* Imagen del hongo */}
        <img
          src={hongoGif}
          alt="Hongo motivador"
          className="w-44 h-44 mx-auto mt-6 rounded-full shadow-md"
          onClick={handleHongoClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};