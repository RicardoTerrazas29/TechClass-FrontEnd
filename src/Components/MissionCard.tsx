type MissionCardProps = {
  mission: string;
};
function MissionCard({ mission }: MissionCardProps) {
  return (
    <div className="mt-8 bg-white p-4 rounded-xl border text-center shadow-md">
      <h4 className="text-lg font-bold text-indigo-600 mb-2">
        🎯 Misión del Día
      </h4>
      <p className="text-gray-700">{mission}</p>
    </div>
  );
}

export default MissionCard;
