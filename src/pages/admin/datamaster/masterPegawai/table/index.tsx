import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PegawaiInterface } from "@/interface";
import { Button } from "antd";
import { ButtonDelete, convertDate } from "@/utils";
import { useEffect } from "react";
import { dataPegawaiRedux } from "../redux";

const TableDataPegawai = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const proses = dataPegawaiRedux();
  useEffect(() => {
    dispatch(actionMaster.getDataPegawai());
  }, [dispatch]);

  const columnsTablePegawai: ColumnInterFace<PegawaiInterface>[] = [
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <Button
            type="primary"
            onClick={() =>
              dispatch(
                helperRedux.showModal({
                  isEdit: true,
                  title: "Edit Data",
                  namaForm: "FormPegawai",
                  data: row,
                })
              )
            }
          >
            <i className="fa fa-edit"></i>
          </Button>
          &nbsp;
          <ButtonDelete
            prosesDelete={() => dispatch(proses.removeData(row._id))}
          />
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
      dataIndex: "type_shift",
      key: "type_shift",
    },
    {
      title: "Jam Istirahat",
      dataIndex: "daily_rest_minute",
      key: "daily_rest_minute",
    },
    {
      title: "Jam Sholat",
      dataIndex: "daily_sholat_minute",
      key: "daily_sholat_minute",
    },
    {
      title: "Jam Break",
      dataIndex: "daily_break_minute",
      key: "daily_break_minute",
    },
    {
      title: "Jatah Cuti",
      dataIndex: "cuti_tahunan",
      key: "cuti_tahunan",
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

  const dataPegawai = useAppSelector((state) => state.dataMaster.dataPegawai);

  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataPegawai.data}
      columns={columnsTablePegawai}
      rowKey={"kode_pegawai"}
      scrollX
      width={2000}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormPegawai",
          })
        )
      }
    />
  );
};

export default TableDataPegawai;
