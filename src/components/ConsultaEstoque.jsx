import { LINE, LINE_STRONG } from "../utils/constants.js";

export default function ConsultaEstoque({ query, onQueryChange, items }) {
  return (
    <section className="panel-surface" style={{ marginBottom: 20, padding: 18, border: `1px solid ${LINE}`, borderRadius: 8 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18 }}>Consultar Estoque</h2>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Código, descrição, caixa, data ou status" style={{ flex: "1 1 280px", minWidth: 0, padding: "10px 11px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5 }} />
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 7 }}>
        {items.slice(0, 50).map((item) => (
          <div className="inventory-row" key={`${item.number}-${item.code}`} style={{ display: "grid", gridTemplateColumns: "minmax(100px, 1fr) minmax(0, 1.6fr) minmax(90px, .7fr) minmax(100px, .8fr)", gap: 10, padding: "9px 0", borderBottom: `1px solid ${LINE}`, fontSize: 12 }}>
            <strong style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{item.code}</strong><span>{item.description || "-"}</span><span>{item.box ? `CAIXA ${item.box.number}` : "Sem caixa"}</span><span>{item.date} · {item.status}</span>
          </div>
        ))}
        {!items.length && <div className="muted-text" style={{ fontSize: 13 }}>Nenhum material encontrado.</div>}
      </div>
    </section>
  );
}
