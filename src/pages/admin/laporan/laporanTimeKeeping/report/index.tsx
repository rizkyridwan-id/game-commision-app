import { IReportTimeKeeping, JenisLaporanType } from "@/interface";
import {
  ExportPdfExcel,
  filterKodeToko,
  replaceUnderscoresWithSpaces,
} from "@/utils";
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

  const checkStatus = (status: string, value: string) =>
    status === "LIBUR" || status === "TIDAK_HADIR"
      ? replaceUnderscoresWithSpaces(status)
      : value;

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
        jam_datang: checkStatus(list.status_pulang, list.jam_datang),
        jam_pulang: checkStatus(list.status_pulang, list.jam_pulang),

        //Sholat
        total_sholat: checkStatus(list.total_sholat, list.total_sholat),
        jam_sholat_start: checkStatus(list.total_sholat, list.jam_sholat_start),
        jam_sholat_end: checkStatus(list.total_sholat, list.jam_sholat_end),

        //Break
        total_break: checkStatus(list.status_break, list.total_break),
        jam_break_start: checkStatus(list.status_break, list.jam_break_start),
        jam_break_end: checkStatus(list.status_break, list.jam_break_end),

        //Istirahat
        total_istirahat: checkStatus(
          list.status_istirahat,
          list.total_istirahat
        ),
        jam_istirahat_start: checkStatus(
          list.status_istirahat,
          list.jam_istirahat_start
        ),
        jam_istirahat_end: checkStatus(
          list.status_istirahat,
          list.jam_istirahat_end
        ),

        status_break: replaceUnderscoresWithSpaces(list.status_break),
        status_istirahat: replaceUnderscoresWithSpaces(list.status_istirahat),
        status_sholat: replaceUnderscoresWithSpaces(list.status_sholat),
        status_datang: replaceUnderscoresWithSpaces(list.status_datang),
        status_pulang: replaceUnderscoresWithSpaces(list.status_pulang),
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
