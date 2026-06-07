export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="stat-card"
      style={{
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div className="stat-top">
        <span>{title}</span>
        {icon}
      </div>

      <h2>{value}</h2>
    </div>
  );
}