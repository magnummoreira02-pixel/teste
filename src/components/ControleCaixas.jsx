import { LINE, INK_SOFT } from "../utils/constants.js";
import CaixaCard from "./CaixaCard.jsx";

export default function ControleCaixas({
  activeBox,
  boxes,
  activeBoxId,
  newBoxDescription,
  newBoxNote,
  exportMessage,
  onCreateBox,
  onFinishActiveBox,
  onToggleInventory,
  onNewBoxDescriptionChange,
  onNewBoxNoteChange,
  onActiveBoxChange,
  onOpenBox,
  onExportBox,
  onRequestDeleteBox
}) {
  return (
    <section className="panel-surface" style={{ marginBottom: 20, padding: 18, border: `1px solid ${LINE}`, borderRadius: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Organizar em Caixas</div>
          <h2 style={{ marginTop: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 20 }}>Controle físico do estoque</h2>
          {activeBox ? (
            <div style={{ marginTop: 9, color: "var(--accent)", fontWeight: 700 }}>CAIXA ATIVA: CAIXA {activeBox.number} · {activeBox.materials?.length || 0} materiais armazenados</div>
          ) : (
            <div className="muted-text" style={{ marginTop: 9 }}>Modo de bipagem normal. Selecione uma caixa para associar os próximos materiais.</div>
          )}
        </div>
        <div className="panel-actions">
          <button type="button" onClick={onCreateBox} style={{ minHeight: 42, padding: "9px 13px", border: "none", borderRadius: 5, background: "var(--accent-dark)", color: "#fff", cursor: "pointer", fontWeight: 700 }}>+ NOVA CAIXA</button>
          <button type="button" onClick={onFinishActiveBox} disabled={!activeBox} style={{ minHeight: 42, padding: "9px 13px", border: `1px solid ${activeBox ? GREEN : LINE_STRONG}`, borderRadius: 5, background: "transparent", color: activeBox ? GREEN : INK_SOFT, cursor: activeBox ? "pointer" : "not-allowed", fontWeight: 700 }}>FINALIZAR CAIXA</button>
          <button type="button" onClick={onToggleInventory} style={{ minHeight: 42, padding: "9px 13px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5, background: "transparent", color: "var(--text)", cursor: "pointer", fontWeight: 700 }}>CONSULTAR ESTOQUE</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto", gap: 8, marginTop: 14 }}>
        <input value={newBoxDescription} onChange={(event) => onNewBoxDescriptionChange(event.target.value)} placeholder="Descrição da nova caixa" style={{ minWidth: 0, padding: "10px 11px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5 }} />
        <input value={newBoxNote} onChange={(event) => onNewBoxNoteChange(event.target.value)} placeholder="Observação opcional" style={{ minWidth: 0, padding: "10px 11px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5 }} />
        <select value={activeBoxId} onChange={(event) => onActiveBoxChange(event.target.value)} style={{ minWidth: 150, padding: "10px 11px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5 }}>
          <option value="">BIPAGEM NORMAL</option>
          {boxes.map((box) => <option key={box.id} value={box.id}>CAIXA {box.number} · {box.status}</option>)}
        </select>
      </div>
      {boxes.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 9, marginTop: 14 }}>
          {boxes.map((box) => (
            <CaixaCard
              key={box.id}
              box={box}
              isActive={box.id === activeBoxId}
              onOpen={() => onOpenBox(box.id)}
              onExport={onExportBox}
              onRequestDelete={onRequestDeleteBox}
            />
          ))}
        </div>
      )}
      {exportMessage && <div style={{ marginTop: 12, padding: "9px 11px", borderRadius: 5, background: GREEN_BG, color: GREEN, fontSize: 12, fontWeight: 600 }}>{exportMessage}</div>}
    </section>
  );
}
