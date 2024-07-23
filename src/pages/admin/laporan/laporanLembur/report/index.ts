import {
  LemburInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import {
  ExportPdfExcel,
  filterKodeToko,
  formatDate,
  getAdjustedEndDate,
  VITE_APP_KODE_TOKO,
} from "@/utils";
import { LaporanLemburDto } from "../dto";

const LaporanLemburPdfExcel = (
  data: LemburInterFace[],
  formInput: LaporanLemburDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(
    formInput.kode_toko || `${VITE_APP_KODE_TOKO}`
  );

  const columns: ColumnGenarator<LemburInterFace>[] = [
    {
      label: "Kode Toko",
      key: "kode_toko",
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
      label: "Tanggal Lembur",
      key: "tgl_lembur",
    },
    {
      label: "Jam Awal Lembur",
      key: "jam_awal",
    },
    {
      label: "Jam Akhir Lembur",
      key: "jam_akhir",
    },
  ];

  const tgl_akhir = getAdjustedEndDate(new Date(formInput.tgl_akhir));

  ExportPdfExcel({
    formatPdf: {
      orientation: "l",
      unit: "mm",
    },
    type: type,
    date: {
      start_date: formInput.tgl_awal,
      end_date: formatDate(tgl_akhir),
    },
    title: `LAPORAN LEMBUR PEGAWAI`,
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
      disableGrandTotal: true,
    },
  });
};

export default LaporanLemburPdfExcel;
