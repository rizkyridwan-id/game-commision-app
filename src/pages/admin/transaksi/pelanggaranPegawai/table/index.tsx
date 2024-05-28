import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PelanggaranPegawaiInterFace } from "@/interface";
import { useEffect } from "react";

const TablePelanggaranPegawai = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionTransaksi.getPelanggaranPegawai());
  }, [dispatch]);

  const columnsTablePelanggaranPegawai: ColumnInterFace<PelanggaranPegawaiInterFace>[] =
    [
      {
        title: "Tanggal",
        dataIndex: "tgl_system",
        key: "tgl_system",
      },
      {
        title: "Nama Pegawai",
        dataIndex: "nama_pegawai",
        key: "nama_pegawai",
      },
      {
        title: "Kode Pegawai",
        dataIndex: "kode_pegawai",
        key: "kode_pegawai",
      },
      {
        title: "Kode Toko",
        dataIndex: "kode_toko",
        key: "kode_toko",
      },
      {
        title: "Deskripsi",
        dataIndex: "deskripsi",
        key: "deskripsi",
      },
    ];

  const dataPelangaranPegawai = useAppSelector(
    (state) => state.transaksi.pelanggaranPegawaiReducer
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Pelanggaran Pegawai"
      dataSource={dataPelangaranPegawai.data || []}
      columns={columnsTablePelanggaranPegawai}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataJabatan",
          })
        )
      }
    />
  );
};

export default TablePelanggaranPegawai;
