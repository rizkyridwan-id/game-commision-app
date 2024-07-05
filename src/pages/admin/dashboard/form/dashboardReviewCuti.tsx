import { PanelContent, TableMaster } from "@/components";
import { ColumnInterFace, PengajuanCutiInterFace } from "@/interface";
import { AppDispatch, actionTransaksi, useAppSelector } from "@/reduxStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxForm } from "redux-form";

const DashbaordReviewCuti = () => {
  const dispatch = useDispatch<AppDispatch>();

  const columns: ColumnInterFace<PengajuanCutiInterFace>[] = [
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
      title: "Tanggal Pengajuan",
      dataIndex: "leave_start_date",
      key: "leave_start_date",
    },
    {
      title: "Alasan",
      dataIndex: "leave_description",
      key: "leave_description",
    },
    {
      title: "Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];
  useEffect(() => {
    dispatch(
      actionTransaksi.getReviewPengajuanCuti({
        namaForm: "DASHBOARD",
      })
    );
  }, [dispatch]);

  const dataReviewCuti = useAppSelector(
    (state) => state.transaksi.reviewPengajuanCuti
  );
  return (
    <PanelContent title="Dashboard Pengajuan Cuti">
      <TableMaster
        dataSource={dataReviewCuti.data}
        columns={columns}
        rowKey={"_id"}
        scrollX
        width={800}
        disabledSearch
      />
    </PanelContent>
  );
};

export default reduxForm({
  form: "dashboardReviewCuti",
})(DashbaordReviewCuti);
