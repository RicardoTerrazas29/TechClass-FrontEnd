import { useNavigate } from "react-router-dom";
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Assignment",
    message: "Math homework due tomorrow",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "2",
    title: "Grade Posted",
    message: "Your Science test grade is now available",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Course Update",
    message: "New material added to Literature course",
    time: "1 day ago",
    read: true,
  },
];
export const NotificationsDropdown = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const viewAll = () => {
    navigate("/notifications");
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-md shadow-lg border py-2">
      <div className="px-4 py-2 border-b">
        <h3 className="font-semibold">Notifications</h3>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 hover:bg-secondary cursor-pointer ${
              !notification.read ? "bg-secondary/50" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {notification.message}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t">
        <button
          onClick={viewAll}
          className="w-full text-center text-sm text-primary hover:underline"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};
