import Panel from "./ui/Panel.jsx";
import Icon from "./ui/Icon.jsx";
import {
  PAPER,
  LINE,
  LINE_STRONG,
  AMBER,
  AMBER_BG,
  GREEN,
  GREEN_BG,
  RED,
  RED_BG,
  INK,
  INK_SOFT
} from "../utils/constants.js";

export default function BuscaMaterial({
  readyToSearch,
  idColumn,
  query,
  searchState,
  matched,
  matchedRowColor,
  matchedAvancoStatus,
  matchedAvancoColor,
  matchedAvancoTextColor,
  matchedAvancoValue,
  suggestions,
  displayColumns,
  highlightedFields,
  highlightedFieldsColor,
  lastProcessedCode,
  searchInputRef,
  onQueryChange,
  onInputKeyDown,
  onClearQuery,
  onRunSearch,
  onOpenScanner
}) {
  return (
    <Panel
      step={3}
      title="Buscar material"
      description="Digite ou leia o QR Code para localizar o item"
      active={readyToSearch}
    >

      {!readyToSearch ? (

        <div
          style={{
            fontSize: 13,
            color: INK_SOFT
          }}
        >
          Configure a coluna de busca
          para habilitar a leitura.
        </div>

      ) : (

        <div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <div>
              <div style={{ color: "var(--accent)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Leitor pronto
              </div>
              <div style={{ color: INK, fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 3 }}>
                Aponte o leitor ou digite o QR Code
              </div>
            </div>
            <div style={{ color: INK_SOFT, fontSize: 12, whiteSpace: "nowrap" }}>
              Coluna: <strong>{idColumn}</strong>
            </div>
          </div>

          <div
            className="reader-frame"
            style={{
              position:
                "relative",

              padding:
                "14px 0"
            }}
          >

            {/* cantos do leitor */}

            <div
              style={{
                position:
                  "absolute",

                top: 4,
                left: 4,

                width: 16,
                height: 16,

                borderTop:
                  `2px solid ${AMBER}`,

                borderLeft:
                  `2px solid ${AMBER}`
              }}
            />

            <div
              style={{
                position:
                  "absolute",

                top: 4,
                right: 4,

                width: 16,
                height: 16,

                borderTop:
                  `2px solid ${AMBER}`,

                borderRight:
                  `2px solid ${AMBER}`
              }}
            />

            <div
              style={{
                position:
                  "absolute",

                bottom: 4,
                left: 4,

                width: 16,
                height: 16,

                borderBottom:
                  `2px solid ${AMBER}`,

                borderLeft:
                  `2px solid ${AMBER}`
              }}
            />

            <div
              style={{
                position:
                  "absolute",

                bottom: 4,
                right: 4,

                width: 16,
                height: 16,

                borderBottom:
                  `2px solid ${AMBER}`,

                borderRight:
                  `2px solid ${AMBER}`
              }}
            />


            <div
              style={{
                display: "flex",

                alignItems:
                  "center",

                gap: 8,

                padding:
                  "0 22px"
              }}
            >

              <Icon
                name="Search"
                size={18}
                color={INK_SOFT}
              />


              <input
                ref={searchInputRef}
                value={query}

                onChange={(e) => onQueryChange(e.target.value)}

                onKeyDown={onInputKeyDown}

                placeholder={
                  `Digite ou leia o código (${idColumn})`
                }

                style={{
                  flex: 1,

                  border: "none",

                  outline: "none",

                  background:
                    "transparent",

                  fontFamily:
                    "'IBM Plex Mono', monospace",

                  fontSize: 20,
                  fontWeight: 600,

                  padding:
                    "10px 0",

                  color: INK
                }}

                autoFocus
              />


              {query && (

                <button
                  onClick={onClearQuery}

                  style={{
                    background:
                      "transparent",

                    border: "none",

                    cursor:
                      "pointer",

                    color:
                      INK_SOFT,

                    display:
                      "flex"
                  }}

                  aria-label=
                    "Limpar busca"
                >

                  <Icon
                    name="X"
                    size={16}
                  />

                </button>
              )}

            </div>

          </div>


          <div className="reader-actions" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 10, marginTop: 12 }}>
            <button
              type="button"
              onClick={onOpenScanner}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 48,
                padding: "12px 16px",
                border: "none",
                borderRadius: 6,
                background: "var(--accent-dark)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                letterSpacing: "0.04em"
              }}
            >
              <Icon name="Camera" size={19} />
              LER QR CODE
            </button>
            <button
              type="button"
              onClick={() => onRunSearch(query)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 48,
                padding: "12px 16px",
                border: `1px solid ${LINE_STRONG}`,
                borderRadius: 6,
                background: "transparent",
                color: "var(--text)",
                cursor: "pointer",
                fontWeight: 700,
                letterSpacing: "0.04em"
              }}
            >
              <Icon name="Search" size={18} />
              CONSULTAR
            </button>
          </div>


          {/* SUGESTÕES */}

          {query &&
            suggestions.length > 0 &&
            searchState === "idle" && (

              <div
                style={{
                  border:
                    `1px solid ${LINE}`,

                  borderRadius: 4,

                  marginTop: 6,

                  overflow:
                    "hidden"
                }}
              >

                {suggestions.map(
                  (r, i) => (

                    <div
                      key={i}

                      onClick={() => {
                        const value =
                          String(
                            r[idColumn]
                          );

                        onQueryChange(value);

                        onRunSearch(value);
                      }}

                      style={{
                        padding:
                          "9px 12px",

                        fontSize: 13,

                        fontFamily:
                          "'IBM Plex Mono', monospace",

                        cursor:
                          "pointer",

                        borderBottom:
                          i <
                          suggestions.length - 1
                            ? `1px solid ${LINE}`
                            : "none",

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        gap: 15
                      }}

                      onMouseEnter={
                        (e) =>
                          e.currentTarget.style.background =
                            PAPER
                      }

                      onMouseLeave={
                        (e) =>
                          e.currentTarget.style.background =
                            "transparent"
                      }
                    >

                      <span
                        style={{
                          fontWeight: 600
                        }}
                      >
                        {
                          String(
                            r[idColumn]
                          )
                        }
                      </span>


                      {displayColumns[0] && (

                        <span
                          style={{
                            color:
                              INK_SOFT,

                            fontFamily:
                              "'IBM Plex Sans', sans-serif",

                            overflow:
                              "hidden",

                            textOverflow:
                              "ellipsis",

                            whiteSpace:
                              "nowrap"
                          }}
                        >
                          {
                            String(
                              r[
                                displayColumns[0]
                              ] ?? ""
                            )
                          }
                        </span>

                      )}

                    </div>

                  )
                )}

              </div>
          )}


          {/* NÃO ENCONTRADO */}

          {searchState ===
            "notfound" && (

            <div
              style={{
                marginTop: 14,

                display:
                  "flex",

                alignItems:
                  "center",

                gap: 8,

                background:
                  RED_BG,

                color: RED,

                border:
                  `1px solid ${RED}`,

                borderRadius: 4,

                padding:
                  "10px 12px",

                fontSize: 13
              }}
            >

              <Icon
                name="AlertTriangle"
                size={15}
                color={RED}
              />

              <span>
                Nenhum item encontrado
                para "{lastProcessedCode || query}" em
                {" "}
                {idColumn}.
              </span>

            </div>
          )}


          {/* ENCONTRADO */}

          {searchState ===
            "found" &&
            matched && (

            <div
              className="located-card"
              style={{
                marginTop: 16,

                background:
                  matchedRowColor || GREEN_BG,

                border:
                  `1px dashed ${matchedRowColor || GREEN}`,

                borderRadius: 6,

                padding:
                  "16px 18px"
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: 8,

                  color: GREEN,

                  fontWeight: 600,

                  fontSize: 14,

                  textTransform:
                    "uppercase",

                  letterSpacing:
                    "0.04em",

                  marginBottom: 10
                }}
              >

                <Icon
                  name="Check"
                  size={15}
                  color={GREEN}
                />

                MATERIAL ENCONTRADO

              </div>


              {matchedAvancoStatus && (
                <div
                  style={{
                    margin: "14px 0 16px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    background: matchedAvancoColor,
                    border: `2px solid ${matchedAvancoTextColor}`,
                    borderRadius: 6,
                    color: matchedAvancoTextColor
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 4
                      }}
                    >
                      Avanço
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 25,
                        fontWeight: 700,
                        lineHeight: 1
                      }}
                    >
                      {String(matchedAvancoValue)}
                    </div>
                  </div>
                  <Icon
                    name="Check"
                    size={30}
                    color={matchedAvancoTextColor}
                    strokeWidth={3}
                  />
                </div>
              )}


              <div className="located-code"
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",

                  fontSize: 20,

                  fontWeight: 600,

                  color: INK,

                  marginBottom: 10
                }}
              >
                <div style={{ color: INK_SOFT, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 4 }}>
                  QR CODE
                </div>
                {
                  String(
                    matched[idColumn]
                  )
                }
              </div>


              <div
                style={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: 6
                }}
              >

                {displayColumns.map(
                  (h) => {
                    const isHighlighted = highlightedFields.includes(h);

                    return (

                    <div
                      key={h}

                      style={{
                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        gap: 20,

                        fontSize: 13.5,

                        borderTop:
                          `1px solid ${LINE}`,

                        background: isHighlighted ? highlightedFieldsColor : "transparent",
                        borderRadius: isHighlighted ? 4 : 0,
                        padding: isHighlighted ? "8px 10px" : "6px 0",

                        paddingTop: isHighlighted ? 8 : 6
                      }}
                    >

                      <span
                        style={{
                          color:
                            isHighlighted ? INK : INK_SOFT,
                          fontWeight: isHighlighted ? 700 : 400
                        }}
                      >
                        {h}
                      </span>

                      <span
                        style={{
                          fontWeight: 500,

                          color: isHighlighted ? INK : "inherit",

                          textAlign:
                            "right"
                        }}
                      >
                        {
                          String(
                            matched[h] ??
                            "—"
                          )
                        }
                      </span>

                    </div>

                    );
                  }
                )}

              </div>

            </div>
          )}

        </div>
      )}

    </Panel>
  );
}
