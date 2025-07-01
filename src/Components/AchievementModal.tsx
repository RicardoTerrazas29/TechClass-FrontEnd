import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from './ui/spinner';

interface AchievementModalProps {
    isOpen: boolean;
    onClose: () => void;
    idLogro: number | null 
}

interface Achievement{
    idLogro: number;
    titulo: string;
    icono: string
}

const AchievementModal = ({ isOpen, onClose, idLogro }: AchievementModalProps) => {
    const [achievementData, setAchievementData] = useState<Achievement | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<String | null>(null);
    const currentDate = new Date().toLocaleDateString('es', { day: 'numeric', month: 'long',year:'numeric' });

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            axios.get(`http://localhost:8080/api/logros/${idLogro}`).then(response => {
                setAchievementData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching achievement data");
                setLoading(false);
            });
        } else {
            setAchievementData(null);
            setError("");
            setLoading(true);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-yellow-50 rounded-3xl shadow-2xl p-6 w-[90vw] max-w-[600px] min-h-[400px] text-center relative font-comic">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-orange-300 hover:bg-orange-400 transition-colors rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-md"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                    {loading && (
                        <p className="text-orange-300 font-bold text-lg">
                            <Spinner>
                                ¡Cargando logro!
                            </Spinner>
                        </p>
                    )}
                    {error && (
                        <div className="text-red-400 my-4 font-bold">
                            {error}
                        </div>
                    )}
                    {achievementData && (
                        <div>
                            {achievementData.icono && (
                                <img
                                    src={`http://localhost:8080/${achievementData.icono}`}
                                    alt="Icono del logro"
                                    className="w-2xs h-48 object-contain my-4 mx-auto rounded-full"
                                />
                            )}
                            <h2 className="text-orange-300 text-2xl my-2 font-bold">
                                {localStorage.getItem("name")}
                            </h2>
                            <p className='my-3'>se ha completado correctamente</p>
                            {achievementData.titulo && (
                                <p className="text-gray-800 font-bold text-xl my-4 bg-yellow-100 rounded-xl p-2">
                                    {achievementData.titulo}
                                </p>
                            )}
                            <div className="text-gray-500 text-md mt-2 bg-gray-100 rounded-lg px-3 py-1 inline-block">
                                {currentDate.split("/").join(" de ")}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AchievementModal