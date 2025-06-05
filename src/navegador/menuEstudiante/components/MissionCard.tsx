// src/Components/MissionCard.tsx (o la ruta exacta donde lo tengas)
import React from 'react';
import { Lightbulb } from 'lucide-react'; // Si usas el icono Lightbulb

interface MissionCardProps {
  mission: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <div className="bg-gradient-to-r from-teal-200 to-emerald-200 p-6 rounded-3xl border-4 border-teal-400 shadow-2xl flex items-center gap-4 animate-bounce-slow-alt">
      <Lightbulb size={36} className="text-teal-700 flex-shrink-0" />
      <div>
        <h3 className="text-xl font-bold text-teal-800 mb-1">Tu próxima misión:</h3>
        <p className="text-lg text-teal-700">{mission}</p>
      </div>
    </div>
  );
};

// ¡¡¡ ESTA LÍNEA ES CRUCIAL !!!
export default MissionCard;