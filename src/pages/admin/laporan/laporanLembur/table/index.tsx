import { TableMaster } from "@/components";
import { ColumnInterFace, LemburInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
// import { reportLemburService } from "../redux";
import { useEffect } from "react";
import { reportLemburService } from "../redux";

const TableLembur = () => {
  const columns: ColumnInterFace<LemburInterFace>[] = [
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
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
      title: "Tanggal Lembur",
      dataIndex: "tgl_lembur",
      key: "tgl_lembur",
    },
    {
      title: "Jam Awal Lembur",
      dataIndex: "jam_awal",
      key: "jam_awal",
    },
    {
      title: "Jam Akhir Lembur",
      dataIndex: "jam_akhir",
      key: "jam_akhir",
    },
    {
      title: "Total Rupiah / Jam",
      dataIndex: "total_rp",
      key: "total_rp",
      render(text: number) {
        return text.toLocaleString("kr-ko");
      },
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as LemburInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reportLemburService();

  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
  return (
    <div className="row">
      <TableMaster dataSource={datatmp} columns={columns} rowKey={"_id"} />
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

export default TableLembur;
