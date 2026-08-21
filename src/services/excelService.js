import * as XLSX from "xlsx";
import { normalizeValue } from "../utils/validation.js";
import { getExportFileName } from "../utils/formatting.js";
import { downloadBlob } from "./downloadService.js";

export function readSpreadsheetFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(
          data,
          {
            type: "array",
            dense: true,
            cellFormula: false
          }
        );

        if (
          !workbook.SheetNames ||
          workbook.SheetNames.length === 0
        ) {
          reject(new Error("Não foi encontrada nenhuma planilha no arquivo."));
          return;
        }

        const parsedSheets = workbook.SheetNames
          .map((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, {
              defval: "",
              raw: false
            });
            return { name: sheetName, rows: json };
          })
          .filter((sheet) => sheet.rows.length > 0);

        if (!parsedSheets.length) {
          reject(new Error("A planilha está vazia ou não foi possível ler as colunas."));
          return;
        }

        const hdrs = Array.from(new Set(
          parsedSheets.flatMap((sheet) => Object.keys(sheet.rows[0]))
        ));

        if (!hdrs.length) {
          reject(new Error("Não foram encontradas colunas na planilha."));
          return;
        }

        const allRows = parsedSheets.flatMap((sheet) =>
          sheet.rows.map((row) => ({ ...row, __sheetName: sheet.name }))
        );

        resolve({ sheets: parsedSheets, headers: hdrs, rows: allRows });
      } catch (err) {
        console.error(err);
        reject(new Error("Não foi possível ler este arquivo. Confirme se é um .xlsx, .xls ou .csv válido."));
      }
    };

    reader.readAsArrayBuffer(file);
  });
}

export function exportHistoryWorkbook(history, headers) {
  if (!history.length) return;
  const exportRows = history
    .slice()
    .reverse()
    .map((item) => ({
      "Nº": item.number,
      "Data": item.date,
      "Hora": item.time,
      "QR Code": item.code,
      "Status": item.status,
      ...headers.reduce((data, header) => ({
        ...data,
        [header]: item.rowData?.[header] ?? "-"
      }), {})
    }));
  const worksheet = XLSX.utils.json_to_sheet(exportRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leituras");
  XLSX.writeFile(workbook, "Historico_Leituras.xlsx");
}

export function buildBipagensRows(history, displayColumns, boxes) {
  return history.slice().reverse().map((item) => ({
    Codigo: item.code,
    Descricao: displayColumns[0] ? item.rowData?.[displayColumns[0]] || "" : "",
    Data: item.date,
    Hora: item.time,
    Usuario: item.user || "",
    Status: item.status,
    Caixa: boxes.find((box) => box.materials?.some((material) => normalizeValue(material.code) === normalizeValue(item.code)))?.number || ""
  }));
}

export function buildHistoryBlob(rowsToExport, format = "xlsx") {
  if (format === "csv") {
    const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    return new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  }
  const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bipagens");
  return new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

export function buildBoxRows(box) {
  if (!box) return [];
  return (box.materials || []).map((material) => ({
    Codigo: material.code,
    Descricao: material.description,
    Data: material.date,
    Hora: material.time,
    Caixa: box.number,
    Status: box.status
  }));
}

export function exportBoxSpreadsheet(box, format) {
  if (!box) return;
  const rowsToExport = buildBoxRows(box);
  const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
  if (format === "csv") {
    downloadBlob(new Blob(["\ufeff", XLSX.utils.sheet_to_csv(worksheet)], { type: "text/csv;charset=utf-8" }), getExportFileName("csv", `Caixa_${box.number}`));
    return;
  }
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Caixa ${box.number}`);
  XLSX.writeFile(workbook, getExportFileName("xlsx", `Caixa_${box.number}`).replace(/:/g, "-"));
}
