import Panel from "./ui/Panel.jsx";

export default function ConfiguradorColunas({
  hasData,
  headers = [],
  idColumn,
  displayColumns = [],
  highlightedFields = [],
  highlightedFieldsColor,
  sheets = [],
  selectedSheets = [],
  colorRules,
  highlightRule,
  onSelectIdColumn,
  onToggleColumn,
  onToggleHighlightedField,
  onHighlightedFieldsColorChange,
  onToggleSheet,
  onUpdateColorRule,
  onHighlightColumnChange,
  onHighlightValueChange,
  onHighlightColorChange
}) {
  if (!hasData) return null;

  return (
    <Panel step={2} title="Configurar colunas" description="Escolha a coluna de código, as colunas exibidas e as planilhas ativas">
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)" }}>
            Coluna de código
          </label>
          <select
            value={idColumn}
            onChange={(e) => onSelectIdColumn?.(e.target.value)}
            style={{ width: "100%", marginTop: 8, padding: "10px 12px" }}
          >
            {headers.map((header) => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)" }}>
            Colunas exibidas
          </label>
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {displayColumns.map((column) => (
              <button
                key={column}
                type="button"
                onClick={() => onToggleColumn?.(column)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: `1px solid ${highlightedFields.includes(column) ? highlightedFieldsColor : "var(--border-strong)"}`,
                  background: highlightedFields.includes(column) ? `${highlightedFieldsColor}22` : "transparent",
                  color: "var(--text)"
                }}
              >
                {column}
              </button>
            ))}
          </div>
        </div>

        {sheets.length > 1 && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted)" }}>
              Planilhas ativas
            </label>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              {sheets.map((sheet) => (
                <label key={sheet.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text)", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={selectedSheets.includes(sheet.name)}
                    onChange={(e) => onToggleSheet?.(sheet.name, !e.target.checked)}
                  />
                  {sheet.name} ({sheet.count})
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
