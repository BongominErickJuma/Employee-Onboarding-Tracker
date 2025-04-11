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
      <ul className="mt-4 space-y-2">
        {currentTasks.map((task) => (
          <li key={task.id} className="flex items-start">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
              className="mt-1 mr-2 cursor-pointer"
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-1 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <span className="font-medium">{task.name}</span>
              {task.description && (
                <span className="block text-sm text-gray-500">
                  {task.description}
                </span>
              )}
            </label>
            <span
              className={`ml-2 text-xs px-2 py-1 rounded ${
                task.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnboardingChecklist;
