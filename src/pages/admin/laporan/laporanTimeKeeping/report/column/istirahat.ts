import {
  ColumnGenarator,
  ColumnInterFace,
  IReportTimeKeeping,
} from "@/interface";
import { replaceUnderscoresWithSpaces } from "@/utils";

export const columnsPdfExcelIstirahat: ColumnGenarator<IReportTimeKeeping>[] = [
  {
    label: "Kode Pegawai",
    key: "kode_pegawai",
    options: {
      halign: "left",
    },
  },
  {
    label: "Start",
    key: "jam_istirahat_start",
    options: {
      halign: "left",
    },
  },
  {
    label: "Stop",
    key: "jam_istirahat_end",
    options: {
      halign: "right",
    },
  },
  {
    label: "Total Menit",
    key: "total_istirahat",
    options: {
      halign: "right",
    },
  },
  {
    label: "Status",
    key: "status_istirahat",
    options: {
      halign: "center",
    },
  },
];

export const columnsTableIstirahat: ColumnInterFace<IReportTimeKeeping>[] = [
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
    dataIndex: "jam_istirahat_start",
    key: "jam_istirahat_start",
  },
  {
    title: "Stop",
    dataIndex: "jam_istirahat_end",
    key: "jam_istirahat_end",
  },
  {
    title: "Total Menit",
    dataIndex: "total_istirahat",
    key: "total_istirahat",
  },
  {
    title: "Staus",
    dataIndex: "status_istirahat",
    key: "status_istirahat",
    render(cell: string) {
      return replaceUnderscoresWithSpaces(cell);
    },
  },
];
