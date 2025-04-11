function SearchFilter({ filter, setFilter, statusFilter, setStatusFilter }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search by Name</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search employees..."
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Filter by Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="all">All Employees</option>
          <option value="onboarded">Fully Onboarded</option>
          <option value="pending">Pending Onboarding</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
