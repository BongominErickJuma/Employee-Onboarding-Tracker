function SearchFilter({ filter, setFilter, statusFilter, setStatusFilter }) {
  return (
    <div className="card animate-fade-in" style={{ padding: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        <div className="search-container">
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>
            <svg className="search-icon" style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search by Name
          </label>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search employees..."
            className="input search-input"
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "8px" }}>
            <svg style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "4px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
            style={{ cursor: "pointer" }}
          >
            <option value="all">All Employees</option>
            <option value="onboarded">Fully Onboarded</option>
            <option value="pending">Pending Onboarding</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
