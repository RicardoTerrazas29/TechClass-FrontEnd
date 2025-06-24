import { useNavigate } from "react-router-dom";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  profesor?: string;
};

export const CourseCard = ({
  id,
  title,
  description,
  icon,
  profesor
}: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      key={id}
      onClick={() => navigate(`/estudiante/cursos/${id}`)}
      className="bg-white p-3 rounded border hover:shadow-lg transition-shadow text-left"
    >
      <div
        className="flex items-center justify-center mb-4"
      >
        <img className="min-h-44" src={`http://localhost:8080/${icon}`}/> 
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">{description}</p>
      <p className="text-sm text-muted-foreground mb-1">{profesor}</p>
    </button>
  );
};
