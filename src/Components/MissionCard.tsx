type MissionCardProps = {
  mission: string;
};
function MissionCard({ mission }: MissionCardProps) {
  return (
    <div className="bg-white text-center p-6 rounded-3xl border-4 border-yellow-300 shadow-2xl mb-10">
      <h4 className="text-lg font-bold text-indigo-600 mb-2">
        🎯 Misión del Día
      </h4>
      <p className="text-gray-700">{mission}</p>
    </div>
  );
}

export default MissionCard;
