import { BACKUP_VERSION } from "../utils/constants.js";
import { getExportFileName } from "../utils/formatting.js";
import { downloadBlob } from "./downloadService.js";

export function buildBackupPayload({ history, boxes, movements, rows, headers, selectedSheets, idColumn, displayColumns }) {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    history,
    boxes,
    movements,
    rows,
    headers,
    selectedSheets,
    idColumn,
    displayColumns
  };
}

export function exportFullBackup(payload) {
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    getExportFileName("json", "Backup_Controle_Estoque")
  );
}

export function parseBackupFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        if (
          payload.version !== BACKUP_VERSION ||
          !Array.isArray(payload.history) ||
          !Array.isArray(payload.boxes)
        ) {
          reject(new Error("Formato inválido"));
          return;
        }
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Formato inválido"));
    reader.readAsText(file);
  });
}
