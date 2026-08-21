import { useRef } from "react";
import { LINE_STRONG, GREEN, RED, INK_SOFT } from "../utils/constants.js";

export default function BackupActions({
  historyLength,
  onSaveHistory,
  onExportBackup,
  onRestoreFile
}) {
  const backupInputRef = useRef(null);

  return (
    <>
      <button type="button" onClick={() => onSaveHistory("xlsx")} disabled={!historyLength} style={{ border: `1px solid ${historyLength ? GREEN : LINE_STRONG}`, borderRadius: 4, padding: "6px 10px", background: historyLength ? GREEN : "transparent", color: historyLength ? "#fff" : INK_SOFT, cursor: historyLength ? "pointer" : "not-allowed", fontSize: 12 }}>SALVAR HISTÓRICO EXCEL</button>
      <button type="button" onClick={() => onSaveHistory("xlsx")} disabled={!historyLength} style={{ border: `1px solid ${historyLength ? GREEN : LINE_STRONG}`, borderRadius: 4, padding: "6px 10px", background: "transparent", color: historyLength ? GREEN : INK_SOFT, cursor: historyLength ? "pointer" : "not-allowed", fontSize: 12 }}>EXPORTAR AGORA EXCEL</button>
      <button type="button" onClick={() => onSaveHistory("csv")} disabled={!historyLength} style={{ border: `1px solid ${historyLength ? GREEN : LINE_STRONG}`, borderRadius: 4, padding: "6px 10px", background: "transparent", color: historyLength ? GREEN : INK_SOFT, cursor: historyLength ? "pointer" : "not-allowed", fontSize: 12 }}>EXPORTAR CSV</button>
      <button type="button" onClick={onExportBackup} style={{ border: `1px solid ${GREEN}`, borderRadius: 4, padding: "6px 10px", background: "transparent", color: GREEN, cursor: "pointer", fontSize: 12 }}>BACKUP COMPLETO</button>
      <button type="button" onClick={() => backupInputRef.current?.click()} style={{ border: `1px solid ${GREEN}`, borderRadius: 4, padding: "6px 10px", background: "transparent", color: GREEN, cursor: "pointer", fontSize: 12 }}>RESTAURAR BACKUP</button>
      <input ref={backupInputRef} type="file" accept="application/json,.json" onChange={onRestoreFile} style={{ display: "none" }} />
    </>
  );
}
