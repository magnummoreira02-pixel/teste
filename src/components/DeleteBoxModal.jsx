import { LINE_STRONG, RED, RED_BG } from "../utils/constants.js";

export default function DeleteBoxModal({ candidate, onCancel, onConfirm }) {
  if (!candidate) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirmar exclusão de caixa">
      <div className="app-modal" style={{ maxWidth: 460 }}>
        <div style={{ padding: "18px 20px", borderBottom: `1px solid var(--border)` }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20 }}>Excluir caixa</h2>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ padding: 12, borderRadius: 6, background: RED_BG, color: RED, fontWeight: 700 }}>Deseja realmente excluir esta caixa?</div>
          <div style={{ display: "grid", gap: 7, marginTop: 15, fontSize: 13 }}>
            <div><strong>Caixa:</strong> CX{candidate.number} {candidate.description ? `- ${candidate.description}` : ""}</div>
            <div><strong>Materiais:</strong> {candidate.materials?.length || 0}</div>
            <div><strong>Localização:</strong> {candidate.description || "Não informada"}</div>
            <div><strong>Data de criação:</strong> {candidate.createdAt}</div>
          </div>
          {candidate.materials?.length ? (
            <div style={{ marginTop: 16, padding: 12, border: `1px solid ${RED}`, borderRadius: 6, color: RED, fontSize: 13 }}><strong>⚠️ ATENÇÃO</strong><br />Esta caixa possui {candidate.materials.length} materiais armazenados.<br /><br />Ao excluir, a caixa <strong>e os {candidate.materials.length} materiais</strong> serão removidos do registro e do estoque. Essa ação não poderá ser desfeita.</div>
          ) : (
            <div style={{ marginTop: 16, color: RED, fontSize: 13 }}>Essa ação não poderá ser desfeita.</div>
          )}
          <div className="panel-actions" style={{ marginTop: 20 }}>
            <button type="button" onClick={onCancel} style={{ minHeight: 42, padding: "9px 14px", border: `1px solid ${LINE_STRONG}`, borderRadius: 5, background: "transparent", color: "var(--text)", cursor: "pointer", fontWeight: 700 }}>CANCELAR</button>
            <button type="button" onClick={onConfirm} style={{ minHeight: 42, padding: "9px 14px", border: `1px solid ${RED}`, borderRadius: 5, background: RED, color: "#fff", cursor: "pointer", fontWeight: 700 }}>🗑️ EXCLUIR CAIXA{candidate.materials?.length ? ` E ${candidate.materials.length} MATERIAL(IS)` : ""}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
