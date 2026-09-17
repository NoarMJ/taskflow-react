export default function TaskItem({ task, onToggleDone, onDelete }) {
    return (
        <li classNmae= "task-item">
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleDone(task.id)}
            />
            <span className={task.done ? "done" : ""}>{task.title}</span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
}

