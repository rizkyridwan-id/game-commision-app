import {
  ColumnGenarator,
  ColumnInterFace,
  IReportTimeKeeping,
} from "@/interface";

export const columnsBreak: ColumnGenarator<IReportTimeKeeping>[] = [
  {
    label: "Kode Pegawai",
    key: "kode_pegawai",
    options: {
      halign: "left",
    },
  },
  {
    label: "Start",
    key: "jam_break_start",
    options: {
      halign: "left",
    },
  },
  {
    label: "Stop",
    key: "jam_break_end",
    options: {
      halign: "right",
    },
  },
  {
    label: "Total Menit",
    key: "total_break",
    options: {
      halign: "right",
    },
  },
  {
    label: "Status",
    key: "status_break",
    options: {
      halign: "center",
    },
  },
];

export const columnsTableBreak: ColumnInterFace<IReportTimeKeeping>[] = [
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
    dataIndex: "jam_break_start",
    key: "jam_break_start",
  },
  {
    title: "Stop",
    dataIndex: "jam_break_end",
    key: "jam_break_end",
  },
  {
    title: "Total Menit",
    dataIndex: "total_break",
    key: "total_break",
  },
  {
    title: "Staus",
    dataIndex: "status_break",
    key: "status_break",
  },
];
