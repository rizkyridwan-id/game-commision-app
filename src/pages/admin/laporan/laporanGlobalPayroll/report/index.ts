import {
  FormFilterLaporanDto,
  ReportPayrollGlobalDtoProps,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import {
  ExportPdfExcel,
  VITE_APP_ALAMAT_TOKO,
  VITE_APP_NAMA_TOKO,
} from "@/utils";

const LaporanGlobalPayrollPdfExcel = (
  data: ReportPayrollGlobalDtoProps[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const columns: ColumnGenarator<ReportPayrollGlobalDtoProps>[] = [
    {
      label: "Kode Toko",
      key: "kode_toko",
      options: {
        halign: "left",
      },
    },
    {
      label: "Gaji Pokok",
      key: "gaji_pokok",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "TJ.Jabatan",
      key: "tunjangan_jabatan",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Bonus Sales",
      key: "bonus_target",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Bonus Absen",
      key: "bonus_absen",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Bonus Jabatan",
      key: "bonus_jabatan",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Kasbon",
      key: "kasbon",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Pot.Lain",
      key: "potongan_lain",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Cuti",
      key: "cuti",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Total",
      key: "total",
      options: {
        halign: "right",
        format: "RP",
      },
    },
  ];

  ExportPdfExcel({
    formatPdf: {
      orientation: "landscape",
      unit: "mm",
    },
    type: type,
    date: {
      start_date: formInput.start_period,
      end_date: formInput.end_period,
    },
    title: `LAPORAN GLOBAL PAYROLL`,
    data: data.map((list, index) => {
      return {
        ...list,
        no: index + 1,
      };
    }),
    dataToko: {
      alamat_toko: String(VITE_APP_ALAMAT_TOKO),
      nama_toko: String(VITE_APP_NAMA_TOKO),
    },
    columns: columns,
    grouping: [],
    grandTotalSetting: {
      colSpan: 0,
      disableGrandTotal: false,
    },
  });
};

export default LaporanGlobalPayrollPdfExcel;
