function MetricsCard({ title, value, icon, type = "primary" }) {
  const getIcon = () => {
    const iconColor = "var(--text-secondary)";
    const iconStyle = { width: "24px", height: "24px", color: iconColor };
    
    switch (icon) {
      case "users":
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "check":
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "clock":
        return (
          <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`metric-card ${type} animate-fade-in`}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "4px" }}>
            {title}
          </h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "var(--text-primary)" }}>
            {value}
          </p>
        </div>
        <div style={{ padding: "12px", background: "var(--secondary)", borderRadius: "8px" }}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}

export default MetricsCard;
