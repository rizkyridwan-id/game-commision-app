import {
  ColumnGenarator,
  ColumnInterFace,
  IReportTimeKeeping,
} from "@/interface";
import { replaceUnderscoresWithSpaces } from "@/utils";

export const columnsPdfExcelKehadiran: ColumnGenarator<IReportTimeKeeping>[] = [
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

export const columnsTableKehadiran: ColumnInterFace<IReportTimeKeeping>[] = [
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
    title: "Jam Datang",
    dataIndex: "jam_datang",
    key: "jam_datang",
    render(_cell: string, row: IReportTimeKeeping) {
      return row.status_datang === "LIBUR" ||
        row.status_datang === "TIDAK_HADIR"
        ? replaceUnderscoresWithSpaces(row.status_datang)
        : row.jam_datang;
    },
  },
  {
    title: "Jam Pulang",
    dataIndex: "jam_pulang",
    key: "jam_pulang",
    render(_cell: string, row: IReportTimeKeeping) {
      return row.status_pulang === "LIBUR" ||
        row.status_pulang === "TIDAK_HADIR"
        ? replaceUnderscoresWithSpaces(row.status_pulang)
        : row.jam_pulang;
    },
  },
  {
    title: "Staus Datang",
    dataIndex: "status_datang",
    key: "status_datang",
    render(cell: string) {
      return replaceUnderscoresWithSpaces(cell);
    },
  },
  {
    title: "Status Pulang",
    dataIndex: "status_pulang",
    key: "status_pulang",
    render(cell: string) {
      return replaceUnderscoresWithSpaces(cell);
    },
  },
];
