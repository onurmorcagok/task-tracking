import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: faColors.color, cursor: faColors.cursor }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>Status: {task.status}</p>
    </div>
  );
};

const faColors = {
  color: "red",
  cursor: "pointer",
};

export default Task;
