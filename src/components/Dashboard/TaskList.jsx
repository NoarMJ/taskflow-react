import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleDone, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
