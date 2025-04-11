import { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import SearchFilter from "./components/SearchFilter";
import useLocalStorage from "./hooks/useLocalStorage";
import { defaultTasks } from "./data/defaultTasks";
import EmployeeFormModal from "./components/EmployeeFormModal";
import MetricsCard from "./components/MetricsCard";
import ToastNotification from "./components/ToastNotification";

function App() {
  const [employees, setEmployees] = useLocalStorage("employees", []);
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Employee Onboarding Tracker
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
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
            </span>
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Track and manage employee onboarding progress
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricsCard
          title="Total Candidates"
          value={metrics.total}
          color="border-l-blue-500"
        />
        <MetricsCard
          title="Fully Onboarded"
          value={metrics.onboarded}
          color="border-l-green-500"
        />
        <MetricsCard
          title="Pending Onboarding"
          value={metrics.pending}
          color="border-l-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SearchFilter
          filter={filter}
          setFilter={setFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <EmployeeList
          employees={filteredEmployees}
          updateEmployeeTasks={updateEmployeeTasks}
          onDeleteEmployee={deleteEmployee}
          restoredEmployeeId={restoredEmployeeId}
        />
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
