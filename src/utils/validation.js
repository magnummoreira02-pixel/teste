export function guessIdColumn(headers) {
  const patterns = [
    "qr",
    "codigo",
    "código",
    "cod",
    "id",
    "sku",
    "material",
    "tag"
  ];

  for (const p of patterns) {
    const found = headers.find((h) =>
      String(h).toLowerCase().includes(p)
    );

    if (found) {
      return found;
    }
  }

  return headers[0] || "";
}

export function normalizeValue(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function getAvancoStatus(row) {
  const column = Object.keys(row).find(
    (key) => ["avanco", "avanço"].includes(normalizeValue(key))
  );
  const value = normalizeValue(column ? row[column] : "");

  if (["sim", "yes", "s", "true"].includes(value)) return "sim";
  if (["nao", "não", "no", "n", "false"].includes(value)) return "nao";
  return "";
}

export function getManualHighlightColor(row, highlightRule) {
  if (!highlightRule?.column || !highlightRule.value.trim()) return "";
  return normalizeValue(row[highlightRule.column]) === normalizeValue(highlightRule.value)
    ? highlightRule.color
    : "";
}

export function getRowColor(sheetName, row, colorRules, highlightRule) {
  const manualColor = getManualHighlightColor(row, highlightRule);
  if (manualColor) return manualColor;
  const name = normalizeValue(sheetName);

  const traitColumn = Object.keys(row).find(
    (key) => normalizeValue(key) === "trait"
  );
  const traitValue = normalizeValue(traitColumn ? row[traitColumn] : "");
  const avancoStatus = getAvancoStatus(row);

  const getTraitColor = () => {
    if (traitValue === "ce3") return colorRules.trait.ce3;
    if (traitValue === "e3") return colorRules.trait.e3;
    if (traitValue === "i5+") return colorRules.trait.i5;
    if (traitValue === "gmb") return colorRules.trait.gmb;
    if (traitValue === "con") return colorRules.trait.con;
    return "";
  };

  const getAvancoColor = () => {
    if (avancoStatus === "sim") {
      return colorRules.avanco.sim;
    }
    if (avancoStatus === "nao") {
      return colorRules.avanco.nao;
    }
    return "";
  };

  if (name.includes("avanco") || name.includes("avanço")) {
    return getAvancoColor();
  }
  if (name.includes("trait")) {
    return getTraitColor();
  }

  return getTraitColor() || getAvancoColor();
}
