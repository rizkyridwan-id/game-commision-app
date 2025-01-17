import { TableMaster } from "@/components";
import { ColumnInterFace, TimeKeepingKehadiranInterFace } from "@/interface";
import { AppDispatch, getDataTimeKeeping, useAppSelector } from "@/reduxStore";
import { replaceUnderscoresWithSpaces, today } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TableDataTimeKeeping = () => {
  const dispatch = useDispatch<AppDispatch>();

  const columnsTableData: ColumnInterFace<TimeKeepingKehadiranInterFace>[] = [
    {
      title: "Kode Pegawai",
      dataIndex: "kode_pegawai",
      key: "kode_pegawai",
    },
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Status Break",
      dataIndex: "status_break",
      key: "status_break",
      render(cell: string) {
        return <div> {replaceUnderscoresWithSpaces(cell)}</div>;
      },
    },
    {
      title: "Status Datang",
      dataIndex: "status_datang",
      key: "status_datang",
      render(cell: string) {
        return <div> {replaceUnderscoresWithSpaces(cell)}</div>;
      },
    },
    {
      title: "Status Istirahat",
      dataIndex: "status_istirahat",
      key: "status_istirahat",
      render(cell: string) {
        return <div> {replaceUnderscoresWithSpaces(cell)}</div>;
      },
    },
    {
      title: "Status Pulang",
      dataIndex: "status_pulang",
      key: "status_pulang",
      render(cell: string) {
        return <div> {replaceUnderscoresWithSpaces(cell)}</div>;
      },
    },
    {
      title: "Status Sholat",
      dataIndex: "status_sholat",
      key: "status_sholat",
      render(cell: string) {
        return <div> {replaceUnderscoresWithSpaces(cell)}</div>;
      },
    },
  ];

  useEffect(() => {
    dispatch(
      getDataTimeKeeping({
        tgl_system: today,
      })
    );
  }, [dispatch]);

  const dataTimeKeping = useAppSelector(
    (state) => state.timeKeeping.dataTimeKeeping
  );

  return (
    <TableMaster
      dataSource={dataTimeKeping?.data || []}
      columns={columnsTableData}
      rowKey={"_id"}
    />
  );
};

export default TableDataTimeKeeping;
