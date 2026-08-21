export function normalizeValue(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function guessIdColumn(headers = []) {
  const candidates = [
    "codigo",
    "codigo material",
    "cod material",
    "material",
    "sku",
    "qr code",
    "qrcode",
    "id"
  ];
  for (const header of headers) {
    if (candidates.includes(normalizeValue(header))) return header;
  }
  for (const header of headers) {
    const n = normalizeValue(header);
    if (n.includes("cod") || n.includes("material") || n.includes("item")) {
      return header;
    }
  }
  return headers[0] || "";
}

export function getAvancoStatus(row = {}) {
  const entry = Object.entries(row).find(([key]) =>
    ["avanco", "avanço"].includes(normalizeValue(key))
  );
  const value = normalizeValue(entry?.[1]);
  if (["sim", "ok", "concluido", "concluído", "feito", "true", "1"].includes(value)) {
    return "sim";
  }
  if (["nao", "não", "pendente", "falta", "false", "0"].includes(value)) {
    return "nao";
  }
  return "";
}

export function getManualHighlightColor(row, highlightedFields, color) {
  if (!row || !highlightedFields?.length) return "";
  const hasMatch = highlightedFields.some((field) => {
    const value = row[field];
    return value !== undefined && String(value).trim() !== "";
  });
  return hasMatch ? color : "";
}

export function getRowColor(sheetName, row, colorRules) {
  if (!colorRules) return "";
  const status = getAvancoStatus(row);
  if (status === "sim" && colorRules.avanco?.sim) return colorRules.avanco.sim;
  if (status === "nao" && colorRules.avanco?.nao) return colorRules.avanco.nao;
  return "";
}
