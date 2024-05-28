import {
  FormFilterLaporanDto,
  PengajuanCutiInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";

const LaporanPengajuanCutiPdfExcel = (
  data: PengajuanCutiInterFace[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);

  const columns: ColumnGenarator<PengajuanCutiInterFace>[] = [
    {
      label: "Tanggal",
      key: "tgl_system",
      options: {
        halign: "left",
      },
    },
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
      label: "Cuti Dari",
      key: "leave_start_date",
      options: {
        halign: "left",
      },
    },
    {
      label: "Cuti Sampai",
      key: "leave_end_date",
      options: {
        halign: "right",
      },
    },
    {
      label: "Alasan Cuti",
      key: "leave_description",
      options: {
        halign: "right",
      },
    },
    {
      label: "Tanggal Valid",
      key: "tgl_validasi",
      options: {
        halign: "center",
      },
    },
    {
      label: "Valid By",
      key: "validasi_by",
      options: {
        halign: "center",
      },
    },
    {
      label: "Tolak By",
      key: "validasi_by",
      options: {
        halign: "center",
      },
    },
    {
      label: "Alasan Tolak",
      key: "reject_description",
      options: {
        halign: "center",
      },
    },
  ];

  ExportPdfExcel({
    formatPdf: {
      orientation: "landscape",
      unit: "mm",
    },
    type: type,
    date: formInput,
    title: `LAPORAN PENGAJUAN CUTI`,
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

export default LaporanPengajuanCutiPdfExcel;
