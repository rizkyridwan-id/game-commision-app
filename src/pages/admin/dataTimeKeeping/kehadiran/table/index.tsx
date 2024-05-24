import { TableMaster } from "@/components";
import { ColumnInterFace, TimeKeepingKehadiranInterFace } from "@/interface";

const TableDataKehadiran = () => {
  const columnsTableDataKehadiran: ColumnInterFace<TimeKeepingKehadiranInterFace>[] =
    [
      {
        title: "Kode Pegawai",
        dataIndex: "kode_pegawai",
        key: "kode_pegawai",
      },
    ];

  return (
    <TableMaster
      dataSource={[]}
      columns={columnsTableDataKehadiran}
      rowKey={"_id"}
    />
  );
};

export default TableDataKehadiran;
