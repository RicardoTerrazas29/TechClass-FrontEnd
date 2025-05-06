import { Clock, Users } from "lucide-react";
interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  students: number;
  duration: string;
}
export const CourseCard = ({
  title,
  instructor,
  progress,
  students,
  duration,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{instructor}</p>
      <div className="space-y-4">
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
