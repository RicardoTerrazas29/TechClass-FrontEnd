import React from 'react'; // Mantén esta línea si tu versión de React o configuración de TS lo requiere

// 1. Define una interfaz para las propiedades (props) del componente
interface StatCardProps {
  label: string;
  count: number;
  icon: React.ReactNode; // React.ReactNode es el tipo para cualquier elemento JSX, cadena, etc.
  gradientColors: string;
  textColor: string;
}

// 2. Asigna la interfaz a las props del componente funcional
const StatCard = ({ label, count, icon, gradientColors, textColor }: StatCardProps) => {
  return (
    <div
      className={`rounded-3xl p-6 shadow-xl text-center flex flex-col items-center justify-center space-y-3 cursor-pointer transition-transform duration-300 hover:scale-105 animate-pulse-on-hover ${gradientColors} text-white`}
    >
      <div className={`p-4 rounded-full shadow-inner ${textColor} bg-opacity-80`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-semibold`}>{label}</h3>
      <div className="text-5xl font-extrabold">{count}</div>
    </div>
  );
};

export default StatCard;