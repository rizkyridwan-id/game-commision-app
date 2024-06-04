import { TableMaster } from "@/components";
import { ColumnInterFace, PengajuanCutiInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanPengajuanCuti } from "../redux";
import { useEffect } from "react";

const TableLporanPenhajuanCuti = () => {
  const columns: ColumnInterFace<PengajuanCutiInterFace>[] = [
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
      title: "Tanggal Valid",
      dataIndex: "tgl_validasi",
      key: "tgl_validasi",
      render(text, record) {
        return record.status_validasi !== "OPEN" ? text : "";
      },
    },
    {
      title: "Valid By",
      dataIndex: "validasi_by",
      key: "validasi_by",
      render(text, record) {
        return record.status_validasi === "APPROVE" ? text : "";
      },
    },
    {
      title: "Tolak By",
      dataIndex: "validasi_by",
      key: "validasi_by",
      render(text, record) {
        return record.status_validasi === "REJECT" ? text : "";
      },
    },
    {
      title: "Alasan Tolak",
      dataIndex: "reject_description",
      key: "reject_description",
      render(text, record) {
        return record.status_validasi === "REJECT" ? text : "";
      },
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as PengajuanCutiInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPengajuanCuti();
  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
  return (
    <div className="row">
      <TableMaster
        dataSource={datatmp}
        columns={columns}
        rowKey={"_id"}
        scrollX
      />
      {datatmp?.length !== 0 && (
        <>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="warning"
              onClick={() => dispatch(proses.exportLaporan("PDF"))}
              block
            >
              Export Pdf
            </ButtonCustom>
          </div>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="success"
              block
              onClick={() => dispatch(proses.exportLaporan("EXCEL"))}
            >
              Export Excel
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default TableLporanPenhajuanCuti;
