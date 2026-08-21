import Panel from "./ui/Panel.jsx";
import BackupActions from "./Backup.jsx";
import { LINE, LINE_STRONG, GREEN, GREEN_BG, RED, INK, INK_SOFT } from "../utils/constants.js";

export default function Historico({
  history,
  showFullHistory,
  foundMaterialsCount,
  displayColumns,
  onExportHistory,
  onClearHistory,
  onSaveHistory,
  onExportBackup,
  onRestoreFile,
  onToggleFullHistory
}) {
  return (
    <Panel
      step={4}
      title="Histórico de leituras"
      description="Acompanhe os materiais identificados pelos QR Codes"
      active={true}
      trailing={
        <>
          <div className="panel-actions">
            <div
              className="history-counter"
              title="Materiais encontrados"
            >
              <span className="history-counter-value">
                {foundMaterialsCount}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Materiais encontrados
              </span>
            </div>
          <button
            onClick={onExportHistory}
            disabled={!history.length}
            style={{
              border: `1px solid ${history.length ? GREEN : LINE_STRONG}`,
              borderRadius: 4,
              padding: "6px 10px",
              background: history.length ? GREEN : "transparent",
              color: history.length ? "#fff" : INK_SOFT,
              cursor: history.length ? "pointer" : "not-allowed",
              fontSize: 12
            }}
          >
            EXPORTAR HISTÓRICO
          </button>
          <button
            onClick={onClearHistory}
            disabled={!history.length}
            style={{
              border: `1px solid ${history.length ? RED : LINE_STRONG}`,
              borderRadius: 4,
              padding: "6px 10px",
              background: "transparent",
              color: history.length ? RED : INK_SOFT,
              cursor: history.length ? "pointer" : "not-allowed",
              fontSize: 12
            }}
          >
            Limpar histórico
          </button>
          <BackupActions
            historyLength={history.length}
            onSaveHistory={onSaveHistory}
            onExportBackup={onExportBackup}
            onRestoreFile={onRestoreFile}
          />
          <button
            onClick={onToggleFullHistory}
            disabled={history.length <= 10}
            style={{
              border: `1px solid ${history.length > 10 ? GREEN : LINE_STRONG}`,
              borderRadius: 4,
              padding: "6px 10px",
              background: "transparent",
              color: history.length > 10 ? GREEN : INK_SOFT,
              cursor: history.length > 10 ? "pointer" : "not-allowed",
              fontSize: 12
            }}
          >
            {showFullHistory ? "MOSTRAR ÚLTIMOS 10" : "VER HISTÓRICO COMPLETO"}
          </button>
          </div>
        </>
      }
    >
      {!history.length ? (
        <div style={{ fontSize: 13, color: INK_SOFT }}>
          Os QR Codes bipados aparecerão aqui.
        </div>
      ) : (
        <>
        <div className="history-table-wrap">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr>
                {["Nº", "Data", "Hora", "QR Code", "Status", ...displayColumns.slice(0, 2)].map((header) => (
                  <th
                    key={header}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      borderBottom: `2px solid ${GREEN}`,
                      color: INK,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.slice(0, showFullHistory ? history.length : 10).map((item) => (
                <tr key={`${item.number}-${item.date}-${item.time}`}>
                  <td style={{ padding: "7px 10px", borderBottom: `1px solid ${LINE}`, fontFamily: "'IBM Plex Mono', monospace" }}>{item.number}</td>
                  <td style={{ padding: "7px 10px", borderBottom: `1px solid ${LINE}`, whiteSpace: "nowrap" }}>{item.date}</td>
                  <td style={{ padding: "7px 10px", borderBottom: `1px solid ${LINE}`, whiteSpace: "nowrap" }}>{item.time}</td>
                  <td style={{ padding: "7px 10px", borderBottom: `1px solid ${LINE}`, fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>{item.code}</td>
                  <td
                    style={{
                      padding: "7px 10px",
                      borderBottom: `1px solid ${LINE}`,
                      color: item.status === "ENCONTRADO" ? GREEN : RED,
                      fontWeight: 700,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {item.status}
                  </td>
                  {displayColumns.slice(0, 2).map((header) => (
                    <td key={header} style={{ padding: "7px 10px", borderBottom: `1px solid ${LINE}`, whiteSpace: "nowrap" }}>
                      {item.rowData?.[header] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="history-cards">
          {history.slice(0, showFullHistory ? history.length : 10).map((item) => (
            <article className="history-card" key={`card-${item.number}-${item.date}-${item.time}`}>
              <div>
                <div className="history-card-label">Código</div>
                <div className="history-card-value history-card-code">{item.code}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="history-card-label">Status</div>
                <div className="history-card-value" style={{ color: item.status === "ENCONTRADO" ? GREEN : RED, fontWeight: 700 }}>{item.status}</div>
              </div>
              <div>
                <div className="history-card-label">Item</div>
                <div className="history-card-value">{displayColumns[0] ? item.rowData?.[displayColumns[0]] || "-" : "-"}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="history-card-label">Data e hora</div>
                <div className="history-card-value">{item.date} {item.time}</div>
              </div>
            </article>
          ))}
        </div>
        </>
      )}
    </Panel>
  );
}
