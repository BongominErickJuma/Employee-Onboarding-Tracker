import { useState } from "react";

function EmployeeFormModal({ onClose, onSubmit }) {
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    jobRole: "",
    startDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    setEmployee({
      fullName: "",
      email: "",
      jobRole: "",
      startDate: "",
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-in">
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--text-primary)" }}>Add New Employee</h2>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: "8px", borderRadius: "50%" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "20px", height: "20px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={employee.fullName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>
                Job Role / Department
              </label>
              <input
                type="text"
                name="jobRole"
                value={employee.jobRole}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>
                Start Date (optional)
              </label>
              <input
                type="date"
                name="startDate"
                value={employee.startDate}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFormModal;
