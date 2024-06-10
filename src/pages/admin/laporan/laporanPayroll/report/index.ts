import {
  FormFilterLaporanDto,
  PayrollInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";

const LaporanPPayrollPdfExcel = (
  data: PayrollInterFace[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);

  const columns: ColumnGenarator<PayrollInterFace>[] = [
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
      label: "Kode Toko",
      key: "kode_toko",
      options: {
        halign: "left",
      },
    },
    {
      label: "Jabatan",
      key: "jabatan",
      options: {
        halign: "right",
      },
    },
    {
      label: "Periode",
      key: "periode",
      options: {
        halign: "right",
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
      label: "Tunjangan Jabatan",
      key: "tunjangan_jabatan",
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
      label: "Potongan Lain",
      key: "potongan_lain",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Grand Total",
      key: "grand_total",
      options: {
        halign: "right",
        format: "RP",
      },
    },
  ];

  ExportPdfExcel({
    formatPdf: {
      orientation: "l",
      unit: "mm",
    },
    type: type,
    date: {
      start_date: formInput.start_period,
      end_date: formInput.end_period,
    },
    title: `LAPORAN PAYROLL`,
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
      colSpan: 5,
    },
  });
};

export default LaporanPPayrollPdfExcel;
