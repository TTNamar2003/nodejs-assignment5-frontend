"use client";

interface Task {
  id: string;
  title: string;
}

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const deleteTask = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ul className="w-full mt-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between p-2 border mb-2">
          {task.title}
          <button className="text-red-500" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
