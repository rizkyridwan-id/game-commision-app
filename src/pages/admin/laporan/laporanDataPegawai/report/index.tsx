import {
  FormFilterLaporanDto,
  PegawaiInterface,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import {
  ExportPdfExcel,
  VITE_APP_ALAMAT_TOKO,
  VITE_APP_NAMA_TOKO,
} from "@/utils";

const LaporanDataPegawaiPdfExcel = (
  data: PegawaiInterface[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const columns: ColumnGenarator<PegawaiInterface>[] = [
    {
      label: "NO",
      key: "no",
      options: {
        halign: "left",
      },
    },
    {
      label: "KODE",
      key: "kode_pegawai",
      options: {
        halign: "left",
      },
    },
    {
      label: "NAMA PEGAWAI",
      key: "nama_pegawai",
      options: {
        halign: "left",
      },
    },
    {
      label: "TGL LAHIR",
      key: "tgl_lahir",
      options: {
        halign: "left",
        format: "DATE",
      },
    },
    {
      label: "JABATAN",
      key: "jabatan",
      options: {
        halign: "left",
      },
    },
    {
      label: "HARI LIBUR",
      key: "hari_libur",
      options: {
        halign: "left",
      },
    },
    {
      label: "SHIFT",
      key: "type_shift",
      options: {
        halign: "left",
      },
    },
    {
      label: "KODE TOKO",
      key: "kode_toko",
      options: {
        halign: "left",
      },
    },
  ];

  const kodeToko =
    formInput.kode_toko === "SEMUA"
      ? "SEMUA TOKO"
      : `TOKO ${formInput.kode_toko}`;

  ExportPdfExcel({
    formatPdf: {
      orientation: "landscape",
      unit: "mm",
    },
    type: type,
    title: `LAPORAN DATA PEGAWAI ${kodeToko}`,
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
      disableGrandTotal: true,
    },
  });
};

export default LaporanDataPegawaiPdfExcel;
