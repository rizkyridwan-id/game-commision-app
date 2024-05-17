import { GenaratorExport } from "@/interface";
import ExportExcel from "./exportExcel";
import ExportPDF from "./exportPdf";
import ExportToTxt from "./exportTextFile";

/**
 * Ekspor ke PDF atau Excel berdasarkan konfigurasi yang diberikan.
 *
 * @param title - Judul laporan.
 * @param columns - Konfigurasi kolom untuk laporan.
 * @param data - Data yang akan disertakan dalam laporan.
 * @param grouping - Gruping yang akan diterapkan dalam laporan ada head dan detail Example: ["no_faktur_hutang"].
 * @param pdfSetting - Opsi untuk config PDF.
 * @param excelSetting - Opsi untuk config Excel.
 * @param txtSetting - Opsi untuk config Txt file.
 * @param date - Rentang tanggal untuk laporan.
 * @param type - Jenis laporan yang akan diekspor ("PDF" "TXT" atau "EXCEL").
 */
export const ExportData = <T>({
  columns,
  data,
  grouping,
  date,
  type,
  txtSetting,
  pdfSetting,
  excelSetting,
}: GenaratorExport<T>): void => {
  const databaru = {
    data: txtSetting?.dataTxt?.length
      ? txtSetting?.dataTxt
      : [txtSetting?.dataTxt],
    template: txtSetting?.templateTxt,
  };
  if (type === "PDF") {
    ExportPDF({
      pdfSetting,
      date,
      data,
      type,
      columns,
      grouping,
    });
  } else if (type === "TXT") {
    ExportToTxt(databaru, txtSetting?.titleTxt || "");
  } else if (type === "EXCEL") {
    ExportExcel({
      date,
      data,
      type,
      columns,
      grouping,
      excelSetting,
    });
  } else {
    ExportExcel({
      date,
      data,
      type,
      columns,
      grouping,
      excelSetting,
    });

    ExportPDF({
      pdfSetting,
      date,
      data,
      type,
      columns,
      grouping,
    });

    ExportToTxt(databaru, txtSetting?.titleTxt || "");
  }
};
