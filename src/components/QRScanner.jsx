import Icon from "./ui/Icon.jsx";

export default function QRScanner({ open, status, videoRef, onClose }) {
  if (!open) return null;
  return (
    <div className="scanner-modal-backdrop" role="dialog" aria-modal="true" aria-label="Leitor de QR Code">
      <div className="scanner-modal">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 16px", borderBottom: `1px solid var(--border)` }}>
          <strong style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ler QR Code</strong>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar leitor"
            style={{ display: "grid", placeItems: "center", width: 40, minHeight: 40, padding: 0, border: `1px solid var(--border)`, borderRadius: 5, background: "transparent", color: "var(--text)", cursor: "pointer" }}
          >
            <Icon name="X" size={19} />
          </button>
        </div>
        <video ref={videoRef} className="scanner-video" playsInline muted />
        <div className="scanner-status">
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
          {status || "Preparando a câmera..."}
        </div>
        <div style={{ padding: "0 16px 16px", color: "var(--muted)", fontSize: 12, lineHeight: 1.5 }}>
          A leitura será consultada e registrada automaticamente.
        </div>
      </div>
    </div>
  );
}
