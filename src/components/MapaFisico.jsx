import { LINE, GREEN_BG, GREEN } from "../utils/constants.js";

export default function MapaFisico({ boxes }) {
  return (
    <section className="panel-surface" style={{ marginBottom: 20, padding: 18, border: `1px solid ${LINE}`, borderRadius: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Relatório final</div>
          <h2 style={{ marginTop: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 18 }}>Mapa Físico do Estoque</h2>
        </div>
        <span className="muted-text" style={{ fontSize: 12 }}>{boxes.length} caixas · {boxes.reduce((total, box) => total + (box.materials?.length || 0), 0)} materiais armazenados</span>
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        {boxes.map((box) => (
          <details key={`map-${box.id}`} style={{ border: `1px solid ${LINE}`, borderRadius: 5, padding: "9px 11px" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>CAIXA {box.number} · {box.materials?.length || 0} materiais · {box.status}</summary>
            <div className="muted-text" style={{ marginTop: 8, fontSize: 12 }}>{box.description || "Sem descrição"} · criada em {box.createdAt}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 9 }}>
              {(box.materials || []).map((material) => <span key={`${box.id}-${material.code}-${material.time}`} style={{ padding: "5px 7px", borderRadius: 4, background: GREEN_BG, color: GREEN, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>{material.code}</span>)}
              {!box.materials?.length && <span className="muted-text" style={{ fontSize: 12 }}>Nenhum material associado.</span>}
            </div>
          </details>
        ))}
        {!boxes.length && <div className="muted-text" style={{ fontSize: 13 }}>Crie uma caixa para começar o mapa físico.</div>}
      </div>
    </section>
  );
}
