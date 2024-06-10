import { GenaratorExportPdfExcel } from "@/interface";
import ExportExcel from "./exportExcel";
import ExportPDF from "./exportPdf";

/**
 * Ekspor ke PDF atau Excel berdasarkan konfigurasi yang diberikan.
 *
 * @param title - Judul laporan.
 * @param columns - Konfigurasi kolom untuk laporan.
 * @param data - Data yang akan disertakan dalam laporan.
 * @param grouping - Gruping yang akan diterapkan dalam laporan ada head dan detail Example: ["no_faktur_hutang"].
 * @param formatPdf - Opsi untuk format PDF.
 * @param date - Rentang tanggal untuk laporan.
 * @param type - Jenis laporan yang akan diekspor ("PDF" atau "EXCEL").
 */
export const ExportPdfExcel = <T>({
  title,
  columns,
  data,
  grouping,
  formatPdf,
  date,
  type,
  grandTotalSetting,
  dataToko,
}: GenaratorExportPdfExcel<T>): void => {
  if (type === "PDF") {
    ExportPDF({
      formatPdf,
      date,
      title,
      data,
      type,
      columns,
      grouping,
      grandTotalSetting,
      dataToko,
    });
  } else if (type === "EXCEL") {
    ExportExcel({
      formatPdf,
      date,
      title,
      data,
      type,
      columns,
      grouping,
      grandTotalSetting,
      dataToko,
    });
  } else {
    // Ekspor ke Excel
    ExportExcel({
      formatPdf,
      date,
      title,
      data,
      type,
      columns,
      grouping,
      grandTotalSetting,
      dataToko,
    });

    // Ekspor ke PDF
    ExportPDF({
      formatPdf,
      date,
      title,
      data,
      type,
      columns,
      grouping,
      grandTotalSetting,
      dataToko,
    });
  }
};
