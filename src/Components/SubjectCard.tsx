export const SubjectCard = ({ title, grade, icon: Icon, color }: any) => (
  <div className="bg-white rounded-lg border p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <span className="text-2xl font-bold">{grade}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2">
      <div
        className={`h-2 rounded-full`}
        style={{
          width: `${grade}%`,
          backgroundColor: color.split(" ")[1],
        }}
      />
    </div>
  </div>
);
