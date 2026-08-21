import Icon from "./ui/Icon.jsx";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="agro-header">
      <div className="brand-mark">
        <div className="brand-icon">
          <Icon name="box" size={26} />
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.02em", color: "var(--text)" }}>
            ACHD MATERIAL CONTROL
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
            Controle e rastreabilidade de materiais
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "#22C55E"
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.2)"
            }}
          />
          Sistema OK
        </span>

        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
          {theme === "dark" ? "Claro" : "Escuro"}
        </button>
      </div>
    </header>
  );
}
