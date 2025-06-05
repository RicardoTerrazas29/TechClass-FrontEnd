import React from "react";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  title: string;
  icon: LucideIcon;
  color: "blue" | "pink" | "green" | "orange";
  percentage: number;
}

const gradientMap: Record<string, { gradient: string; text: string }> = {
  blue: {
    gradient: "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400",
    text: "text-blue-900",
  },
  pink: {
    gradient: "bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400",
    text: "text-pink-900",
  },
  green: {
    gradient: "bg-gradient-to-br from-green-200 via-green-300 to-green-400",
    text: "text-green-900",
  },
  orange: {
    gradient: "bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400",
    text: "text-orange-900",
  },
};

const SubjectCard: React.FC<SubjectCardProps> = ({ title, icon: Icon, color, percentage }) => {
  const { gradient, text } = gradientMap[color] || gradientMap.blue;

  return (
    <div
      className={`
        subject-card relative p-4 rounded-2xl shadow-md cursor-pointer
        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
        border-4 border-transparent ${gradient} ${text}
        hover:border-yellow-400 hover:animate-pulse
      `}
      style={{
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)",
      }}
    >
      <Icon className="w-8 h-8 mb-3" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm">Progreso: {percentage}%</p>
    </div>
  );
};

export default SubjectCard;






