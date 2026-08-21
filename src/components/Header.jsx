import Icon from "./ui/Icon.jsx";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="agro-header">
      <div className="brand-mark">
        <div className="brand-icon"><Icon name="Activity" size={21} /></div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.04em" }}>
            AGRO MATERIAL CONTROL
          </div>
          <div className="muted-text" style={{ fontSize: 12, marginTop: 2 }}>
            Controle e rastreabilidade de materiais
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent)", fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} /> Sistema online
        </span>
        <button className="theme-toggle" onClick={onToggleTheme}>
          <Icon name={theme === "dark" ? "Sun" : "Moon"} size={15} />
          {theme === "dark" ? "Tema claro" : "Tema escuro"}
        </button>
      </div>
    </header>
  );
}
