import { TableMaster } from "@/components";
import { ColumnInterFace, PengajuanCutiInterFace } from "@/interface";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxForm } from "redux-form";

const TableReviewCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

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
    {
      title: "Action",
      key: "actions",
      render: (_cell: string, row: PengajuanCutiInterFace) => {
        return (
          <Button
            type="primary"
            onClick={() =>
              dispatch(
                helperRedux.showModal({
                  isEdit: true,
                  title: "Review Cuti",
                  namaForm: "FormReviewCuti",
                  data: row,
                })
              )
            }
          >
            <i className="fa fa-edit"></i>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(actionTransaksi.getReviewPengajuanCuti());
  }, [dispatch]);

  const dataReviewCuti = useAppSelector(
    (state) => state.transaksi.reviewPengajuanCuti
  );

  return (
    <TableMaster
      dataSource={dataReviewCuti.data}
      columns={columns}
      rowKey={"kode_pegawai"}
      scrollX
      width={800}
      disabledSearch
    />
  );
};

export default reduxForm({
  form: "TableReviewCuti",
})(TableReviewCuti);
