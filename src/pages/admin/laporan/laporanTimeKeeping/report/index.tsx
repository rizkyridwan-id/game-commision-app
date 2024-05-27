import { IReportTimeKeeping, JenisLaporanType } from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";
import { LaporanTimeKeepingDto } from "../dto";
import {
  columnsBreak,
  columnsPdfExcelIstirahat,
  columnsPdfExcelKehadiran,
} from "./column";
import { columnsPdfExcelSholat } from "./column/sholat";

const LaporanTimeKeepingPdfExcel = (
  data: IReportTimeKeeping[],
  formInput: LaporanTimeKeepingDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);
  const typeTimeKeeping = formInput.type_time_keeping;

  ExportPdfExcel({
    formatPdf: {
      orientation: "p",
      unit: "mm",
    },
    type: type,
    date: formInput,
    title: `LAPORAN TIME KEEPING ${typeTimeKeeping}`,
    data: data.map((list, index) => {
      return {
        ...list,
        no: index + 1,
      };
    }),
    dataToko: {
      alamat_toko: String(dataToko?.alamat_toko),
      nama_toko: String(dataToko?.nama_toko),
    },
    columns:
      typeTimeKeeping === "KEHADIRAN"
        ? columnsPdfExcelKehadiran
        : typeTimeKeeping === "BREAK"
          ? columnsBreak
          : typeTimeKeeping === "ISTIRAHAT"
            ? columnsPdfExcelIstirahat
            : columnsPdfExcelSholat,
    grouping: [],
    grandTotalSetting: {
      colSpan: 6,
      disableGrandTotal: true,
    },
  });
};

export default LaporanTimeKeepingPdfExcel;
