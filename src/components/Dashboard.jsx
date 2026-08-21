function MetricCard({ label, value, hint, accent }) {
  return (
    <div className="metric-card" style={{ borderLeftColor: accent }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)"
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {value}
        </span>
        {hint && (
          <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Dashboard({ rows = [], history = [], boxes = [], latestReading }) {
  const readings = history.length;
  const foundCount = history.filter((item) => item.status === "ENCONTRADO").length;
  const notFoundCount = history.filter((item) => item.status === "NÃO ENCONTRADO").length;

  return (
    <div className="metric-grid">
      <MetricCard label="Leituras" value={readings} hint={readings ? "total" : ""} accent="#60A5FA" />
      <MetricCard label="Materiais encontrados" value={foundCount} hint={`${notFoundCount} não encontrados`} accent="#22C55E" />
      <MetricCard label="Caixas" value={boxes.length} hint="" accent="#A78BFA" />
      <MetricCard label="Itens na planilha" value={rows.length} hint="" accent="#EF4444" />
    </div>
  );
}
