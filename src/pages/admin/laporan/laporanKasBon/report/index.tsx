import {
  FormFilterLaporanDto,
  KasBonInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";

const LaporanKasBonCutiPdfExcel = (
  data: KasBonInterFace[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);

  const columns: ColumnGenarator<KasBonInterFace>[] = [
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
      label: "Alasan Kasbon",
      key: "alasan_kasbon",
    },
    {
      label: "Total Kasbon",
      key: "total_kasbon",
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
    date: formInput,
    title: `LAPORAN KASBON`,
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

export default LaporanKasBonCutiPdfExcel;
