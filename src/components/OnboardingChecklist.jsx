import { useState } from "react";
import ProgressBar from "./ProgressBar";

function OnboardingChecklist({ tasks, onTaskChange }) {
  const [currentTasks, setCurrentTasks] = useState(tasks);

  const handleTaskToggle = (taskId) => {
    const updatedTasks = currentTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setCurrentTasks(updatedTasks);
    onTaskChange(updatedTasks);
  };

  const completedCount = currentTasks.filter((task) => task.completed).length;
  const totalTasks = currentTasks.length;
  const progress =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div>
      <ProgressBar progress={progress} />
      <ul style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {currentTasks.map((task, index) => (
          <li 
            key={task.id} 
            className="animate-slide-in"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              display: "flex",
              alignItems: "flex-start",
              padding: "12px",
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              transition: "all 0.2s ease"
            }}
          >
            <label className="checkbox-container" style={{ marginRight: "12px", marginTop: "2px" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
              />
              <span className="checkbox-checkmark"></span>
            </label>
            <div style={{ flex: 1, opacity: task.completed ? 0.6 : 1 }}>
              <span style={{ 
                fontWeight: "500", 
                color: "var(--text-primary)", 
                display: "block",
                textDecoration: task.completed ? "line-through" : "none"
              }}>
                {task.name}
              </span>
              {task.description && (
                <span style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  color: "var(--text-secondary)", 
                  marginTop: "2px" 
                }}>
                  {task.description}
                </span>
              )}
            </div>
            <span className={`badge ${task.completed ? "badge-success" : "badge-warning"}`}>
              {task.completed ? "✓ Done" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnboardingChecklist;
