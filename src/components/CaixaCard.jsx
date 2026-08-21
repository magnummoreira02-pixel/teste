import { LINE, GREEN, GREEN_BG, AMBER, RED, INK_SOFT } from "../utils/constants.js";

export default function CaixaCard({ box, isActive, onOpen, onExport, onRequestDelete }) {
  return (
    <div style={{ padding: 11, border: `1px solid ${isActive ? GREEN : LINE}`, borderRadius: 6, background: isActive ? GREEN_BG : "var(--surface-soft)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontWeight: 700 }}><span>CAIXA {box.number}</span><span style={{ color: box.status === "ABERTA" ? AMBER : GREEN, fontSize: 11 }}>{box.status}</span></div>
      <div className="muted-text" style={{ marginTop: 4, fontSize: 12 }}>{box.description || "Sem descrição"} · {box.materials?.length || 0} materiais</div>
      <div style={{ marginTop: 5, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--accent)" }}>QR DA CAIXA: CAIXA-{box.number}</div>
      <div className="box-card-actions panel-actions" style={{ marginTop: 8 }}>
        <button type="button" onClick={onOpen} style={{ padding: "6px 8px", minHeight: 34, border: `1px solid ${GREEN}`, borderRadius: 4, background: "transparent", color: GREEN, cursor: "pointer", fontSize: 11 }}>📦 ABRIR</button>
        <button type="button" onClick={() => onExport(box, "xlsx")} style={{ padding: "6px 8px", minHeight: 34, border: `1px solid ${LINE_STRONG}`, borderRadius: 4, background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 11 }}>EXCEL</button>
        <button type="button" onClick={() => onExport(box, "csv")} style={{ padding: "6px 8px", minHeight: 34, border: `1px solid ${LINE_STRONG}`, borderRadius: 4, background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 11 }}>CSV</button>
        <button type="button" onClick={() => onExport(box, "pdf")} style={{ padding: "6px 8px", minHeight: 34, border: `1px solid ${LINE_STRONG}`, borderRadius: 4, background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 11 }}>PDF</button>
        <button type="button" onClick={() => onRequestDelete(box)} style={{ padding: "6px 8px", minHeight: 34, border: `1px solid ${RED}`, borderRadius: 4, background: "transparent", color: RED, cursor: "pointer", fontSize: 11 }}>🗑️ EXCLUIR CAIXA</button>
      </div>
    </div>
  );
}
