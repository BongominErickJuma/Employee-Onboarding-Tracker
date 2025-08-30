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
      <div className="card animate-fade-in" style={{ padding: "32px", textAlign: "center" }}>
        <svg style={{ width: "64px", height: "64px", margin: "0 auto 16px", color: "var(--text-secondary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p style={{ color: "var(--text-primary)", fontSize: "18px", marginBottom: "8px" }}>No employees added yet</p>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Click "Add New Employee" to get started</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
      {employees.map((employee, index) => (
        <div
          key={employee.id}
          ref={(el) => (employeeRefs.current[employee.id] = el)}
          className={`employee-card animate-fade-in transition-all ${
              deletingId === employee.id
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            } ${
              restoredEmployeeId === employee.id
                ? "restored"
                : ""
            }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <button
            onClick={() => {
              setDeletingId(employee.id);
              setTimeout(() => onDeleteEmployee(employee.id), 300);
            }}
            className="btn-danger"
            style={{ position: "absolute", top: "16px", right: "16px", padding: "8px" }}
            aria-label="Delete employee"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "16px", height: "16px" }}
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--text-primary)", marginBottom: "4px" }}>{employee.fullName}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {employee.jobRole}
              </p>
              {employee.startDate && (
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(employee.startDate).toLocaleDateString()}
                </p>
              )}
            </div>
            {employee.onboarded && (
              <span className="badge badge-success">
                ✓ Onboarded
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
