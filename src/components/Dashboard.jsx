import { AMBER, RED } from "../utils/constants.js";
import { normalizeValue } from "../utils/validation.js";

export default function Dashboard({ rows, history, boxes, latestReading }) {
  return (
    <div className="metric-grid">
      {[
        ["Total de materiais", rows.length || history.length, "var(--accent)"],
        ["Bipados hoje", history.filter((item) => item.date === new Date().toLocaleDateString("pt-BR")).length, "var(--accent)"],
        ["Total de caixas", boxes.length, "var(--accent)"],
        ["Caixas em aberto", boxes.filter((box) => box.status === "ABERTA").length, AMBER],
        ["Sem caixa", history.filter((item) => !boxes.some((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(item.code)))).length, RED],
        ["Última bipagem", latestReading?.time || "--:--:--", "var(--muted)"],
      ].map(([label, value, color]) => (
        <div className="metric-card" key={label} style={{ borderLeftColor: color }}>
          <div className="muted-text" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
          <div style={{ marginTop: 7, fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 600, color }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
