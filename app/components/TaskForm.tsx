"use client";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
}

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskForm({ setTasks }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks((prev) => [newTask, ...prev]);
    setTitle(""); // Clear input after adding task
  };

  return (
    <div className="w-full flex justify-center items-center">
      <input
        className="border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task"
      />
      <button className="ml-2 bg-blue-500 text-white p-2" onClick={addTask}>
        Add
      </button>
    </div>
  );
}
