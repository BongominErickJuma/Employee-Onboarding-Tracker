function MetricsCard({ title, value, color }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${color}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

export default MetricsCard;
