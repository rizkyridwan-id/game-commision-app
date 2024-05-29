import { TableMaster } from "@/components";
import { ColumnInterFace, PayrollInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanPayroll } from "../redux";
import { useEffect } from "react";

const TableLporanPayroll = () => {
  const columns: ColumnInterFace<PayrollInterFace>[] = [
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
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
    {
      title: "Gajih Pokok",
      dataIndex: "gaji_pokok",
      key: "gaji_pokok",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    {
      title: "Potongan Lain",
      dataIndex: "potongan_lain",
      key: "potongan_lain",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    {
      title: "Bonus Target",
      dataIndex: "bonus_target",
      key: "bonus_target",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    {
      title: "Bonus Absen",
      dataIndex: "bonus_absen",
      key: "bonus_absen",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },

    {
      title: "Tunjangan",
      dataIndex: "tunjangan_jabatan",
      key: "tunjangan_jabatan",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      align: "right",
      render: (cell: number) => {
        return (
          <div className="text-end">
            {" "}
            {Number(cell || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as PayrollInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPayroll();

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
        rowKey={"kode_pegawai"}
        scrollX
        width={1900}
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

export default TableLporanPayroll;
