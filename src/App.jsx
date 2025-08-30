import { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import SearchFilter from "./components/SearchFilter";
import useLocalStorage from "./hooks/useLocalStorage";
import { defaultTasks } from "./data/defaultTasks";
import { defaultEmployees } from "./data/defaultEmployees";
import EmployeeFormModal from "./components/EmployeeFormModal";
import MetricsCard from "./components/MetricsCard";
import ToastNotification from "./components/ToastNotification";

function App() {
  // Initialize with default employees, but merge with any existing localStorage data
  const getInitialEmployees = () => {
    try {
      const stored = localStorage.getItem("employees");
      if (stored) {
        const parsedEmployees = JSON.parse(stored);
        // Always ensure default employees are present
        const existingIds = parsedEmployees.map(emp => emp.id);
        const missingDefaults = defaultEmployees.filter(emp => !existingIds.includes(emp.id));
        return [...missingDefaults, ...parsedEmployees];
      }
      return defaultEmployees;
    } catch {
      return defaultEmployees;
    }
  };

  const [employees, setEmployees] = useLocalStorage("employees", getInitialEmployees());
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deletedEmployee, setDeletedEmployee] = useState(null);
  const [restoredEmployeeId, setRestoredEmployeeId] = useState(null);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
      tasks: defaultTasks.map((task) => ({
        ...task,
        completed: false,
      })),
      onboarded: false,
    };
    setEmployees([...employees, newEmployee]);
    setShowModal(false);
  };

  const metrics = {
    total: employees.length,
    onboarded: employees.filter((emp) => emp.onboarded).length,
    pending: employees.filter((emp) => !emp.onboarded).length,
  };

  const deleteEmployee = (employeeId) => {
    const employeeToDelete = employees.find((emp) => emp.id === employeeId);
    setDeletedEmployee(employeeToDelete);

    const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
    setEmployees(updatedEmployees);

    setNotification({
      message: `${employeeToDelete.fullName} removed`,
      onUndo: () => {
        setEmployees([...updatedEmployees, employeeToDelete]);
        setRestoredEmployeeId(employeeToDelete.id);
        setNotification(null);

        // Reset the highlight after 3 seconds
        setTimeout(() => setRestoredEmployeeId(null), 3000);
      },
    });
  };
  const updateEmployeeTasks = (employeeId, updatedTasks) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === employeeId) {
        const allCompleted = updatedTasks.every((task) => task.completed);
        return {
          ...emp,
          tasks: updatedTasks,
          onboarded: allCompleted,
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName
      .toLowerCase()
      .includes(filter.toLowerCase());
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "onboarded") return matchesSearch && emp.onboarded;
    if (statusFilter === "pending") return matchesSearch && !emp.onboarded;
    return matchesSearch;
  });

  return (
    <div style={{ padding: '32px 16px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="card animate-fade-in" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Employee Onboarding Tracker
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Track and manage employee onboarding progress
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary animate-scale-in"
            style={{ alignSelf: 'flex-start' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Employee
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
          <MetricsCard
            title="Total Candidates"
            value={metrics.total}
            icon="users"
            type="primary"
          />
        </div>
        <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
          <MetricsCard
            title="Fully Onboarded"
            value={metrics.onboarded}
            icon="check"
            type="success"
          />
        </div>
        <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
          <MetricsCard
            title="Pending Onboarding"
            value={metrics.pending}
            icon="clock"
            type="warning"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="animate-fade-in" style={{animationDelay: "0.4s"}}>
          <SearchFilter
            filter={filter}
            setFilter={setFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <div className="animate-slide-in" style={{animationDelay: "0.5s"}}>
          <EmployeeList
            employees={filteredEmployees}
            updateEmployeeTasks={updateEmployeeTasks}
            onDeleteEmployee={deleteEmployee}
            restoredEmployeeId={restoredEmployeeId}
          />
        </div>
      </div>

      {showModal && (
        <EmployeeFormModal
          onClose={() => setShowModal(false)}
          onSubmit={addEmployee}
        />
      )}

      {notification && (
        <ToastNotification
          message={notification.message}
          onUndo={notification.onUndo}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
