export function getExportFileName(extension, prefix = "Historico_Bipagens") {
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
  return `${prefix}_${stamp}.${extension}`;
}

export function nowDateString() {
  return new Date().toLocaleDateString("pt-BR");
}

export function nowTimeString() {
  return new Date().toLocaleTimeString("pt-BR", { hour12: false });
}
