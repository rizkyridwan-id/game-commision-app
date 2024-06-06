import { TableMaster } from "@/components";
import { ColumnInterFace, PelanggaranPegawaiInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom, convertDate } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanPelanggaranPegawai } from "../redux";
import { useEffect } from "react";

const TableLporanPelanggaran = () => {
  const columns: ColumnInterFace<PelanggaranPegawaiInterFace>[] = [
    {
      title: "Tanggal",
      dataIndex: "tgl_system",
      key: "tgl_system",
      render(text) {
        return convertDate(text, true);
      },
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
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as PelanggaranPegawaiInterFace[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPelanggaranPegawai();

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

export default TableLporanPelanggaran;
