import Panel from "./ui/Panel.jsx";
import Icon from "./ui/Icon.jsx";
import ColorOption from "./ui/ColorOption.jsx";
import { PAPER, LINE, LINE_STRONG, GREEN, INK, INK_SOFT } from "../utils/constants.js";

export default function ConfiguradorColunas({
  hasData,
  headers,
  idColumn,
  displayColumns,
  highlightedFields,
  highlightedFieldsColor,
  sheets,
  selectedSheets,
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
  return (
    <Panel
      step={2}
      title="Configurar colunas"
      description="Defina a coluna QR e os campos exibidos"
      active={hasData}
    >

      {!hasData ? (

        <div
          style={{
            fontSize: 13,
            color: INK_SOFT
          }}
        >
          Importe uma planilha
          para configurar as colunas.
        </div>

      ) : (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18
          }}
        >

          <div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,

                fontSize: 12.5,

                fontWeight: 600,

                color: INK_SOFT,

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.04em",

                marginBottom: 8
              }}
            >

              <Icon
                name="Settings2"
                size={13}
              />

              Coluna com o número /
              código QR

            </label>


            <select
              value={idColumn}

              onChange={(e) => onSelectIdColumn(e.target.value)}

              style={{
                width: "100%",

                padding:
                  "9px 10px",

                borderRadius: 4,

                border:
                  `1px solid ${LINE_STRONG}`,

                background: PAPER,

                fontFamily:
                  "'IBM Plex Mono', monospace",

                fontSize: 13,

                color: INK
              }}
            >

              {headers.map(
                (h) => (

                  <option
                    key={h}
                    value={h}
                  >
                    {h}
                  </option>

                )
              )}

            </select>

          </div>


          <div>

            <div
              style={{
                fontSize: 12.5,

                fontWeight: 600,

                color: INK_SOFT,

                textTransform:
                  "uppercase",

                letterSpacing:
                  "0.04em",

                marginBottom: 8
              }}
            >
              Colunas a exibir
              no resultado
            </div>


            <div
              style={{
                display: "flex",

                flexWrap:
                  "wrap",

                gap: 8
              }}
            >

              {headers
                .filter(
                  (h) =>
                    h !== idColumn
                )

                .map((h) => {

                  const checked =
                    displayColumns.includes(
                      h
                    );

                  return (

                    <button
                      key={h}

                      onClick={() =>
                        onToggleColumn(h)
                      }

                      style={{
                        display:
                          "flex",

                        alignItems:
                          "center",

                        gap: 6,

                        padding:
                          "6px 10px",

                        borderRadius: 4,

                        border:
                          `1px solid ${
                            checked
                              ? GREEN
                              : LINE_STRONG
                          }`,

                        background:
                          checked
                            ? GREEN
                            : "transparent",

                        color:
                          checked
                            ? "#fff"
                            : INK_SOFT,

                        fontSize: 12.5,

                        cursor:
                          "pointer",

                        fontFamily:
                          "'IBM Plex Sans', sans-serif"
                      }}
                    >

                      {checked && (

                        <Icon
                          name="Check"
                          size={12}
                        />

                      )}

                      {h}

                    </button>

                  );
                })}

            </div>

          </div>

          <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: INK_SOFT, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Campos destacados no material encontrado
            </div>
            <div style={{ fontSize: 12, color: INK_SOFT }}>
              QR Code e Avanço permanecem em destaque. Selecione outros campos, como Trait, para realçar também.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ColorOption
                label="Cor dos campos selecionados"
                value={highlightedFieldsColor}
                onChange={onHighlightedFieldsColorChange}
              />
              <span style={{ fontSize: 11.5, color: INK_SOFT }}>
                Essa cor será aplicada ao Trait, Code, ID ou outros campos marcados.
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {headers.filter((header) => header !== idColumn).map((header) => {
                const checked = highlightedFields.includes(header);
                return (
                  <button
                    key={`highlight-${header}`}
                    onClick={() => onToggleHighlightedField(header)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: `1px solid ${checked ? GREEN : LINE_STRONG}`,
                      background: checked ? GREEN : "transparent",
                      color: checked ? "#fff" : INK_SOFT,
                      fontSize: 12.5,
                      cursor: "pointer"
                    }}
                  >
                    {checked && <Icon name="Check" size={12} />}
                    {header}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: INK_SOFT, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Abas pesquisadas ao escanear
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {sheets.map((sheet) => {
                const checked = selectedSheets.includes(sheet.name);
                return (
                  <button
                    key={sheet.name}
                    onClick={() => onToggleSheet(sheet.name, checked)}
                    style={{ padding: "6px 10px", borderRadius: 4, border: `1px solid ${checked ? GREEN : LINE_STRONG}`, background: checked ? GREEN : "transparent", color: checked ? "#fff" : INK_SOFT, fontSize: 12.5, cursor: "pointer" }}
                  >
                    {checked && <Icon name="Check" size={12} />} {sheet.name}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: INK_SOFT }}>
              As abas desmarcadas não entram na busca nem na lista de resultados.
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: INK_SOFT, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Cores das linhas
            </div>
            <div style={{ fontSize: 12, color: INK_SOFT }}>Avanço</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <ColorOption label="Sim" value={colorRules.avanco.sim} onChange={(value) => onUpdateColorRule("avanco", "sim", value)} />
              <ColorOption label="Não" value={colorRules.avanco.nao} onChange={(value) => onUpdateColorRule("avanco", "nao", value)} />
            </div>
            <div style={{ fontSize: 12, color: INK_SOFT }}>Trait</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <ColorOption label="CE3" value={colorRules.trait.ce3} onChange={(value) => onUpdateColorRule("trait", "ce3", value)} />
              <ColorOption label="E3" value={colorRules.trait.e3} onChange={(value) => onUpdateColorRule("trait", "e3", value)} />
              <ColorOption label="I5+" value={colorRules.trait.i5} onChange={(value) => onUpdateColorRule("trait", "i5", value)} />
              <ColorOption label="GMB" value={colorRules.trait.gmb} onChange={(value) => onUpdateColorRule("trait", "gmb", value)} />
              <ColorOption label="CON" value={colorRules.trait.con} onChange={(value) => onUpdateColorRule("trait", "con", value)} />
            </div>

            <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 12, color: INK_SOFT, fontWeight: 600 }}>
                Destaque personalizado
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto", gap: 8, alignItems: "center" }}>
                <select
                  value={highlightRule.column}
                  onChange={(e) => onHighlightColumnChange(e.target.value)}
                  style={{ padding: "8px 9px", borderRadius: 4, border: `1px solid ${LINE_STRONG}`, fontSize: 12.5 }}
                >
                  <option value="">Escolha a coluna</option>
                  {headers.map((header) => <option key={header} value={header}>{header}</option>)}
                </select>
                <input
                  value={highlightRule.value}
                  onChange={(e) => onHighlightValueChange(e.target.value)}
                  placeholder="Valor a destacar"
                  style={{ padding: "8px 9px", borderRadius: 4, border: `1px solid ${LINE_STRONG}`, fontSize: 12.5 }}
                />
                <ColorOption
                  label="Cor"
                  value={highlightRule.color}
                  onChange={onHighlightColorChange}
                />
              </div>
              <div style={{ fontSize: 11.5, color: INK_SOFT }}>
                Exemplo: escolha Trait, digite CE3 e defina a cor do destaque.
              </div>
            </div>
          </div>

        </div>
      )}

    </Panel>
  );
}
