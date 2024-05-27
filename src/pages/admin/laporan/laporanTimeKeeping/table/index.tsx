import { TableMaster } from "@/components";
import { ColumnInterFace, IReportTimeKeeping } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxLaporanTimeKeeping } from "../redux";

const TableLaproanTimeKeeping = () => {
  const dispatch = useDispatch<AppDispatch>();

  const columnsTableData: ColumnInterFace<IReportTimeKeeping>[] = [
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
      title: "Jam Datang",
      dataIndex: "jam_datang",
      key: "jam_datang",
    },
    {
      title: "Jam Pulang",
      dataIndex: "jam_pulang",
      key: "jam_pulang",
    },
    {
      title: "Staus Datang",
      dataIndex: "status_datang",
      key: "status_datang",
    },
    {
      title: "Staus Pulang",
      dataIndex: "status_pulang",
      key: "status_pulang",
    },
  ];

  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);

  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as IReportTimeKeeping[];

  const proses = reduxLaporanTimeKeeping();

  return (
    <div className="row mt-4">
      <div className="col-12">
        <TableMaster
          dataSource={datatmp || []}
          columns={columnsTableData}
          rowKey={"kode_pegawai"}
        />
      </div>
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

export default TableLaproanTimeKeeping;
