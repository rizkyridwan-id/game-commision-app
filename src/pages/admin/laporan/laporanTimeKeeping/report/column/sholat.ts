import {
  ColumnGenarator,
  ColumnInterFace,
  IReportTimeKeeping,
} from "@/interface";

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
  },
  {
    title: "Stop",
    dataIndex: "jam_sholat_end",
    key: "jam_sholat_end",
  },
  {
    title: "Total Menit",
    dataIndex: "total_sholat",
    key: "total_sholat",
  },
  {
    title: "Staus",
    dataIndex: "status_sholat",
    key: "status_sholat",
  },
];
