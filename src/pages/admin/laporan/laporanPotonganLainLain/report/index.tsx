import {
  FormFilterLaporanDto,
  PotonganLainInterFace,
  JenisLaporanType,
  ColumnGenarator,
} from "@/interface";
import { ExportPdfExcel, filterKodeToko } from "@/utils";

const LaporanPotonganLainCutiPdfExcel = (
  data: PotonganLainInterFace[],
  formInput: FormFilterLaporanDto,
  type: JenisLaporanType
) => {
  const dataToko = filterKodeToko(formInput.kode_toko);

  const columns: ColumnGenarator<PotonganLainInterFace>[] = [
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
      label: "Qty Cicilan",
      key: "qty_cicil_bulan",
      options: {
        halign: "left",
      },
    },
    {
      label: "Saldo Rp",
      key: "saldo_rp",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Cicilan Rp",
      key: "cicil_rp",
      options: {
        halign: "right",
        format: "RP",
      },
    },
    {
      label: "Total Rp",
      key: "total_rp",
      options: {
        halign: "center",
        format: "RP",
      },
    },
    {
      label: "Alasan",
      key: "alasan",
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
    title: `LAPORAN POTONGAN LAIN LAIN`,
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

export default LaporanPotonganLainCutiPdfExcel;
