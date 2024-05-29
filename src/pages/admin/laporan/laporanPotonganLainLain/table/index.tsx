import { TableMaster } from "@/components";
import { ColumnInterFace, PotonganLainInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanPotonganLainLain } from "../redux";
import { useEffect } from "react";

const TableLporanPotonganLain = () => {
  const columnsTabelPotonganLainLain: ColumnInterFace<PotonganLainInterFace>[] =
    [
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
        title: "Qty Cicilan",
        dataIndex: "qty_cicil_bulan",
        key: "qty_cicil_bulan",
        render: (text: number) => {
          return text;
        },
      },
      {
        title: "Saldo Rp",
        dataIndex: "saldo_rp",
        key: "saldo_rp",
        render: (text: number) => {
          return text.toLocaleString("kr-ko");
        },
      },
      {
        title: "Cicilan Rp",
        dataIndex: "cicil_rp",
        key: "cicil_rp",
        render: (text: number) => {
          return text.toLocaleString("kr-ko");
        },
      },
      {
        title: "Total Rp",
        dataIndex: "total_rp",
        key: "total_rp",
        render: (text: number) => {
          return text.toLocaleString("kr-ko");
        },
      },
      {
        title: "Alasan",
        dataIndex: "alasan",
        key: "alasan",
      },
    ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as PotonganLainInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPotonganLainLain();
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
        columns={columnsTabelPotonganLainLain}
        rowKey={"kode_pegawai"}
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

export default TableLporanPotonganLain;
