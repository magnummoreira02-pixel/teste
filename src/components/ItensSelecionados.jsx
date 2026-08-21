import Panel from "./ui/Panel.jsx";
import { PANEL, PAPER, LINE, GREEN, AMBER_BG, INK, INK_SOFT } from "../utils/constants.js";
import { getRowColor } from "../utils/validation.js";

export default function ItensSelecionados({
  selectedRows,
  idColumn,
  displayColumns,
  matched,
  colorRules,
  highlightRule
}) {
  return (
    <Panel
      step={5}
      title={
        `Itens selecionados (${selectedRows.length})`
      }
      description="Planilha filtrada e pronta para consulta"
      active={true}
    >

      <div className="items-table-wrap">

        <table
          style={{
            width: "100%",

            borderCollapse:
              "collapse",

            fontSize: 12.5
          }}
        >

          <thead>

            <tr>

              <th
                style={{
                  textAlign:
                    "left",

                  padding:
                    "8px 10px",

                  borderBottom:
                    `2px solid ${GREEN}`,

                  color: INK,

                  fontFamily:
                    "'IBM Plex Mono', monospace",

                  whiteSpace:
                    "nowrap"
                }}
              >
                {idColumn}
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  borderBottom: `2px solid ${GREEN}`,
                  color: INK_SOFT,
                  fontWeight: 500,
                  whiteSpace: "nowrap"
                }}
              >
                Aba
              </th>


              {displayColumns.map(
                (h) => (

                  <th
                    key={h}

                    style={{
                      textAlign:
                        "left",

                      padding:
                        "8px 10px",

                      borderBottom:
                        `2px solid ${GREEN}`,

                      color:
                        INK_SOFT,

                      fontWeight:
                        500,

                      whiteSpace:
                        "nowrap"
                    }}
                  >
                    {h}
                  </th>

                )
              )}

            </tr>

          </thead>


          <tbody>

            {selectedRows.map(
              (r, i) => {

                const isMatch =
                  matched &&
                  String(
                    r[idColumn]
                  ) ===
                  String(
                    matched[idColumn]
                  );

                const rowColor = getRowColor(r.__sheetName, r, colorRules, highlightRule);

                return (

                  <tr
                    key={i}

                    style={{
                      background:
                        rowColor ||
                        (isMatch
                          ? AMBER_BG
                          : i % 2 === 0
                            ? PANEL
                            : PAPER)
                    }}
                  >

                    <td
                      style={{
                        padding:
                          "7px 10px",

                        borderBottom:
                          `1px solid ${LINE}`,

                        fontFamily:
                          "'IBM Plex Mono', monospace",

                        fontWeight:
                          isMatch
                            ? 600
                            : 400,

                        whiteSpace:
                          "nowrap"
                      }}
                    >
                      {
                        String(
                          r[idColumn]
                        )
                      }
                    </td>

                    <td
                      style={{
                        padding: "7px 10px",
                        borderBottom: `1px solid ${LINE}`,
                        color: INK_SOFT,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {r.__sheetName}
                    </td>


                    {displayColumns.map(
                      (h) => (

                        <td
                          key={h}

                          style={{
                            padding:
                              "7px 10px",

                            borderBottom:
                              `1px solid ${LINE}`,

                            color: INK,

                            whiteSpace:
                              "nowrap"
                          }}
                        >
                          {
                            String(
                              r[h] ?? ""
                            )
                          }
                        </td>

                      )
                    )}

                  </tr>

                );
              }
            )}

          </tbody>

        </table>

      </div>

    </Panel>
  );
}
