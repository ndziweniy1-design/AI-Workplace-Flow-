import { jsPDF } from "jspdf";

export function exportTextAsPdf(text: string, filename: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const lines = doc.splitTextToSize(text, maxWidth);
  let y = margin;
  const lineHeight = 15;

  for (const line of lines as string[]) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
