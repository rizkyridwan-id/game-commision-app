import { TableMaster } from "@/components";
import { ColumnInterFace, KasBonInterFace } from "@/interface";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanKasBon } from "../redux";

const TableLporanKasBon = () => {
  const columnsTableKasbon: ColumnInterFace<KasBonInterFace>[] = [
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
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Alasan Kasbon",
      dataIndex: "alasan_kasbon",
      key: "alasan_kasbon",
    },
    {
      title: "Total Kasbon",
      dataIndex: "total_kasbon",
      key: "total_kasbon",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as KasBonInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanKasBon();

  return (
    <div className="row mt-4">
      <TableMaster
        dataSource={datatmp}
        columns={columnsTableKasbon}
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

export default TableLporanKasBon;
