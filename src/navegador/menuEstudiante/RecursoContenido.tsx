import { Spinner } from '@/Components/ui/spinner'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function RecursoContenido() {
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useParams() 
    const { url, nombre, idRecurso, idContenido } = location.state || {}
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [puedeMarcarRevisado, setPuedeMarcarRevisado] = useState(false);
    const embedUrl = convertirAEmbed(url)

    const handleIframeLoad = () => {
        setIsLoading(false)
    }

    function convertirAEmbed(url: string): string {
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
          return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url; 
      }
      
    if (!url) {
        return (
            <div className='flex flex-col items-center p-5 bg-[#e0f7fa] min-h-screen box-border font-sans'>
                <div className='bg-[#ffccbc] border-[3px] border-dashed border-[#e64a19] p-[30px] rounded-[20px] 
                text-center max-w-[500px] shadow-[0_4px_8px_rgba(0,0,0,0.1)]'>
                    <p className='text-[#e65a19] text-[1.8em] font-bold mb-4'>¡Uy! Parece que no encontramos este recurso. Pídele ayuda a tu profesor. 🧐</p>
                    <img src="https://thumbs.dreamstime.com/b/sad-emoticon-18589362.jpg" alt="Cara triste" className='w-[60px] h-[60px]' />
                </div>
            </div>
        )
    }

    const handleVolver = () => {
        if (puedeMarcarRevisado) {
          navigate(`/estudiante/cursos/${id}`, { state: { revisado: true, idRecurso, idContenido } });
        } else {
          navigate(-1);
        }
    };

    useEffect(() => {
        if (puedeMarcarRevisado) {
          // Si quieres marcar automáticamente después de 5 segundos:
          // navigate(-1, { state: { revisado: true, idRecurso, idContenido } });
          // O puedes dejar que el usuario decida cuándo irse.
        }
      }, [puedeMarcarRevisado]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPuedeMarcarRevisado(true)
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('mostrarModalLogro') === 'true') {
            setShowModal(true);
            localStorage.removeItem('mostrarModalLogro');
        }
    }, []);
      
    return (
        <div className='flex flex-col items-start p-5 bg-[#e0f7fa] min-h-screen box-border font-sans'>
            <button
                onClick={handleVolver}
                className="mb-6 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a contenido
            </button>
            <div className='flex flex-col items-center w-full mx-auto'>
                <h2 className='text-[#00796b] text-[2.5em] text-center mb-4 text-shadow-[2px_2px_#b2dfdb] py-2.5 max-w-[90%]'>
                    ¡Estamos viendo: {nombre}! ✨
                </h2>
                <div className='relative w-full max-w-[1200px] h-[700px] bg-white rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.2)] overflow-hidden mb-[30px]'>
                    {isLoading && (
                        <div className='absolute inset-0 bg-[rgba(255,255,255,0.95)] flex flex-col justify-center items-center rounded-2xl'>
                            <p className='text-[#ff9800] text-[1.8em] font-bold mb-5 text-center text-shadow-[1px_1px_#ffcc80]'>
                                ¡Cargando diversión! Un momentito... 🚀
                            </p>
                            <Spinner size="medium" />
                        </div>
                    )}
                    <iframe
                        src={embedUrl}
                        title={nombre}
                        className={`absolute inset-0 w-full h-full border-none rounded-[10px] ${isLoading ? 'hidden' : 'block'}`}
                        allowFullScreen
                        onLoad={handleIframeLoad}
                    />
                </div>
                <p className='text-[#004d40] text-[1.2em] mt-auto pt-2 text-center'>¡Aprender es súper divertido! 📚</p>
            </div>
        </div>
    )
}

export default RecursoContenido
