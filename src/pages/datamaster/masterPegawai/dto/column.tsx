import { Button } from "antd";
import { ButtonDelete, convertDate } from "@/utils";
import { PegawaiInterface } from "./interface";
import { ColumnInterFace } from "@/interface";

export const columnsTablePegawai: ColumnInterFace<PegawaiInterface>[] = [
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: () => (
      <div className="text-center">
        <Button type="primary">
          <i className="fa fa-edit"></i>
        </Button>
        &nbsp;
        <ButtonDelete prosesDelete={() => console.log("Mask")} />
      </div>
    ),
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
    title: "Tgl Lahir",
    dataIndex: "tgl_lahir",
    key: "tgl_lahir",
    render(value) {
      return <div> {convertDate(value, true)} </div>;
    },
  },
  {
    title: "Jabatan",
    dataIndex: "jabatan",
    key: "jabatan",
  },
  {
    title: "Hari Libur",
    dataIndex: "hari_libur",
    key: "hari_libur",
  },
  {
    title: "Shift",
    dataIndex: "shift",
    key: "shift",
  },
  {
    title: "Jam Istirahat",
    dataIndex: "jam_istirahat",
    key: "jam_istirahat",
  },
  {
    title: "Jam Sholat",
    dataIndex: "jam_sholat",
    key: "jam_sholat",
  },
  {
    title: "Jam Break",
    dataIndex: "jam_break",
    key: "jam_break",
  },
  {
    title: "Jatah Cuti",
    dataIndex: "jatah_cuti",
    key: "jatah_cuti",
  },
  {
    title: "Gajih Pokok",
    dataIndex: "gaji_pokok",
    key: "gaji_pokok",
    render(text: number) {
      return <div> {text.toLocaleString("kr-ko")} </div>;
    },
  },
  {
    title: "Tunjangan Jabatan",
    dataIndex: "tunjangan_jabatan",
    key: "tunjangan_jabatan",
    render(text: number) {
      return <div> {text.toLocaleString("kr-ko")} </div>;
    },
  },
  {
    title: "Kode Sales",
    dataIndex: "kode_sales",
    key: "kode_sales",
  },
  {
    title: "Kode Toko",
    dataIndex: "kode_toko",
    key: "kode_toko",
  },
];
