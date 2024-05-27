import {
  ColumnGenarator,
  IReportTimeKeeping,
  JenisLaporanType,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";
import { LaporanTimeKeepingDto } from "../dto";

const LaporanTimeKeepingPdfExcel = (
  data: IReportTimeKeeping[],
  formInput: LaporanTimeKeepingDto,
  type: JenisLaporanType
) => {
  const columns: ColumnGenarator<IReportTimeKeeping>[] = [
    {
      label: "Kode Pegawai",
      key: "kode_pegawai",
      options: {
        halign: "left",
      },
    },
    {
      label: "Nama Pegawai",
      key: "nama_pegawai",
      options: {
        halign: "left",
      },
    },
    {
      label: "Jam Datang",
      key: "jam_datang",
      options: {
        halign: "right",
      },
    },
    {
      label: "Jam Pulang",
      key: "jam_pulang",
      options: {
        halign: "right",
      },
    },
    {
      label: "Status Datang",
      key: "status_datang",
      options: {
        halign: "center",
      },
    },
    {
      label: "Status Pulang",
      key: "status_pulang",
      options: {
        halign: "center",
      },
    },
  ];
  const dataToko = filterKodeToko(formInput.kode_toko);

  ExportPdfExcel({
    formatPdf: {
      orientation: "p",
      unit: "mm",
    },
    type: type,
    date: formInput,
    title: `LAPORAN TIME KEEPING ${formInput.type_time_keeping}`,
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
    columns: columns,
    grouping: [],
    grandTotalSetting: {
      colSpan: 6,
      disableGrandTotal: true,
    },
  });
};

export default LaporanTimeKeepingPdfExcel;
