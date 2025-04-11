import { useEffect, useRef, useState } from "react";
import OnboardingChecklist from "./OnboardingChecklist";

function EmployeeList({
  employees,
  updateEmployeeTasks,
  onDeleteEmployee,
  restoredEmployeeId,
}) {
  const [deletingId, setDeletingId] = useState(null);
  const employeeRefs = useRef({});

  // Scroll to restored employee
  useEffect(() => {
    if (restoredEmployeeId && employeeRefs.current[restoredEmployeeId]) {
      employeeRefs.current[restoredEmployeeId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [restoredEmployeeId]);

  if (employees.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500">No employees added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {employees.map((employee) => (
        <div
          key={employee.id}
          ref={(el) => (employeeRefs.current[employee.id] = el)}
          className={`
            bg-white p-6 rounded-lg shadow-md relative
            transition-all duration-300
            ${
              deletingId === employee.id
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }
            ${
              restoredEmployeeId === employee.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-lg"
            }
          `}
        >
          <button
            onClick={() => {
              setDeletingId(employee.id);
              setTimeout(() => onDeleteEmployee(employee.id), 300);
            }}
            className="absolute top-4 right-4 p-1 bg-red-50 rounded-full text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
            aria-label="Delete employee"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex justify-start gap-5 items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{employee.fullName}</h3>
              <p className="text-sm text-gray-600">{employee.jobRole}</p>
              {employee.startDate && (
                <p className="text-sm text-gray-500">
                  Starts: {new Date(employee.startDate).toLocaleDateString()}
                </p>
              )}
            </div>
            {employee.onboarded && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Onboarded
              </span>
            )}
          </div>
          <OnboardingChecklist
            tasks={employee.tasks}
            onTaskChange={(updatedTasks) =>
              updateEmployeeTasks(employee.id, updatedTasks)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
