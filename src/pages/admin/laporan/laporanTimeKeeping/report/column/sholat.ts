import {
  ColumnGenarator,
  ColumnInterFace,
  IReportTimeKeeping,
} from "@/interface";
import { replaceUnderscoresWithSpaces } from "@/utils";

export const columnsPdfExcelSholat: ColumnGenarator<IReportTimeKeeping>[] = [
  {
    label: "Kode Pegawai",
    key: "kode_pegawai",
    options: {
      halign: "left",
    },
  },
  {
    label: "Start",
    key: "jam_sholat_start",
    options: {
      halign: "left",
    },
  },
  {
    label: "Stop",
    key: "jam_sholat_end",
    options: {
      halign: "right",
    },
  },
  {
    label: "Total Menit",
    key: "total_sholat",
    options: {
      halign: "right",
    },
  },
  {
    label: "Status",
    key: "status_sholat",
    options: {
      halign: "center",
    },
  },
];
export const columnsTableSholat: ColumnInterFace<IReportTimeKeeping>[] = [
  {
    title: "Tanggal",
    dataIndex: "tgl_system",
    key: "tgl_system",
  },
  {
    title: "Kode Pegawai",
    dataIndex: "kode_pegawai",
    key: "kode_pegawai",
  },
  {
    title: "Nama Pegawai",
    dataIndex: "nama_pegawai",
    key: "nama_pegawai",
  },
  {
    title: "Start",
    dataIndex: "jam_sholat_start",
    key: "jam_sholat_start",
    render(_cell: string, row: IReportTimeKeeping) {
      return row.status_sholat === "LIBUR" ||
        row.status_sholat === "TIDAK_HADIR"
        ? replaceUnderscoresWithSpaces(row.status_sholat)
        : row.jam_sholat_start;
    },
  },
  {
    title: "Stop",
    dataIndex: "jam_sholat_end",
    key: "jam_sholat_end",
    render(_cell: string, row: IReportTimeKeeping) {
      return row.status_sholat === "LIBUR" ||
        row.status_sholat === "TIDAK_HADIR"
        ? replaceUnderscoresWithSpaces(row.status_sholat)
        : row.jam_break_end;
    },
  },
  {
    title: "Total Menit",
    dataIndex: "total_sholat",
    key: "total_sholat",
    render(_cell: string, row: IReportTimeKeeping) {
      return row.status_sholat === "LIBUR" ||
        row.status_sholat === "TIDAK_HADIR"
        ? replaceUnderscoresWithSpaces(row.status_sholat)
        : row.total_sholat;
    },
  },
  {
    title: "Staus",
    dataIndex: "status_sholat",
    key: "status_sholat",
    render(cell: string) {
      return replaceUnderscoresWithSpaces(cell);
    },
  },
];
