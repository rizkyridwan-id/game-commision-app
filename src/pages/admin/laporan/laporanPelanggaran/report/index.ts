import {
  FormFilterLaporanDto,
  PelanggaranPegawaiInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";

const LaporanPelangganPegawaiPdfExcel = (
  data: PelanggaranPegawaiInterFace[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);

  const columns: ColumnGenarator<PelanggaranPegawaiInterFace>[] = [
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
      label: "Kode Toko",
      key: "kode_toko",
      options: {
        halign: "left",
      },
    },
    {
      label: "Deskripsi",
      key: "deskripsi",
      options: {
        halign: "right",
      },
    },
  ];

  ExportPdfExcel({
    formatPdf: {
      orientation: "p",
      unit: "mm",
    },
    type: type,
    date: formInput,
    title: `LAPORAN PELANGGARAN PEGAWAI`,
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
      disableGrandTotal: true,
    },
  });
};

export default LaporanPelangganPegawaiPdfExcel;
