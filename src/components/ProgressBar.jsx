function ProgressBar({ progress }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)" }}>
          Onboarding Progress
        </span>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--primary)" }}>
          {progress}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
