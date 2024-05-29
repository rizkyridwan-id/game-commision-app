import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PengajuanCutiInterFace } from "@/interface";
import { useEffect } from "react";

const TabelPengajuanCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(
      actionTransaksi.getPengajuanCuti({
        namaForm: "Data Pengajuan Cuti",
      })
    );
  }, [dispatch]);

  const columnsTabelPengajuanCuti: ColumnInterFace<PengajuanCutiInterFace>[] = [
    {
      title: "Kode Pegawai",
      dataIndex: "kode_pegawai",
      key: "kode_pegawai",
    },
    {
      title: "Tanggal Pengajuan Cuti",
      dataIndex: "tgl_system",
      key: "tgl_system",
    },
    {
      title: "Cuti Dari",
      dataIndex: "leave_start_date",
      key: "leave_start_date",
    },
    {
      title: "Cuti Sampai",
      dataIndex: "leave_end_date",
      key: "leave_end_date",
    },
    {
      title: "Alasan Cuti",
      dataIndex: "leave_description",
      key: "leave_description",
    },
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];

  const dataCuti = useAppSelector((state) => state.transaksi.dataPengajuanCuti);
  return (
    <TableMaster
      addButtonTitle="Tambah Pengajuan Cuti"
      dataSource={dataCuti.data || []}
      columns={columnsTabelPengajuanCuti}
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

export default TabelPengajuanCuti;
