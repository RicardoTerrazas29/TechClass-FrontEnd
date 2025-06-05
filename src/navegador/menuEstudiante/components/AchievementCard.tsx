// menuEstudiante/components/AchievementCard.tsx
import React from 'react'; // Make sure React is imported

interface AchievementCardProps {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  emoji,
  title,
  description,
  color,
}) => {
  return (
    <div
      className={`bg-${color}-100 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col items-center text-center`}
    >
      <div className={`text-5xl mb-2 animate-bounce text-${color}-500`}>
        {emoji}
      </div>
      <h4 className={`font-bold text-${color}-800`}>{title}</h4>
      <p className={`text-sm text-${color}-600`}>{description}</p>
    </div>
  );
};

export default AchievementCard;
  
  