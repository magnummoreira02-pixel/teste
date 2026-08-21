export function printBoxPdf(box, rowsToExport) {
  if (!box) return;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(`<html><head><title>Caixa ${box.number}</title></head><body><h1>CAIXA ${box.number}</h1><p>${box.description || ""}</p><p>${rowsToExport.length} materiais</p><pre>${rowsToExport.map((item) => `${item.Codigo} - ${item.Descricao}`).join("\\n")}</pre><script>window.print()<\\/script></body></html>`);
  printWindow.document.close();
}
