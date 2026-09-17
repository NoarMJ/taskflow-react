import { useState } from "react";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Welcome to TaskFlow", done: false },
    { id: 2, title: "Add your first real task", done: false },
  ]);

  function handleAddTask(title) {
    const newTask = { id: Date.now(), title, done: false };
    setTasks([...tasks, newTask]);
  }

  function handleToggleDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Tasks</h1>
        <button type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />
    </div>
  );
}