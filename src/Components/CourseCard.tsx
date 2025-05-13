import { useNavigate } from "react-router-dom";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
};

export const CourseCard = ({
  id,
  title,
  description,
  icon: Icon,
  color,
}: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      key={id}
      onClick={() => navigate(`/estudiante/cursos/${id}`)}
      className="bg-white p-6 rounded border hover:shadow-lg transition-shadow text-left"
    >
      <div
        className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
};
