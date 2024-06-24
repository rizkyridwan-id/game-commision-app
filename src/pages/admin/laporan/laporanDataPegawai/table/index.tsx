import { TableMaster } from "@/components";
import {
  ColumnInterFace,
  PegawaiInterface,
  ReportPayrollGlobalDtoProps,
} from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom, convertDate } from "@/utils";
import { exportLaporan } from "../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const TableLaporanDataPegawai = () => {
  const dispatch = useDispatch<AppDispatch>();

  const columnsTableKasbon: ColumnInterFace<PegawaiInterface>[] = [
    {
      title: "Kode",
      dataIndex: "kode_pegawai",
      key: "kode_pegawai",
    },
    {
      title: "Nama Pegawai",
      dataIndex: "nama_pegawai",
      key: "nama_pegawai",
    },
    {
      title: "Tgl Lahir",
      dataIndex: "tgl_lahir",
      key: "tgl_lahir",
      render(text) {
        return convertDate(text, true);
      },
    },
    {
      title: "Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Hari Libur",
      dataIndex: "hari_libur",
      key: "hari_libur",
    },
    {
      title: "Type Shift",
      dataIndex: "type_shift",
      key: "type_shift",
    },
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as ReportPayrollGlobalDtoProps[];

  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
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
              block
              type="button"
              onClick={() => dispatch(exportLaporan("PDF"))}
            >
              Export Pdf
            </ButtonCustom>
          </div>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="success"
              block
              type="button"
              onClick={() => dispatch(exportLaporan("EXCEL"))}
            >
              Export Excel
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default TableLaporanDataPegawai;
