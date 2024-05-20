import { TableMaster } from "@/components";
import { columnsTablePegawai, exampleDataPegawai } from "../dto";
import { useDispatch } from "react-redux";
import { AppDispatch, utilityController } from "@/reduxStore";

const TableDataPegawai = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={exampleDataPegawai}
      columns={columnsTablePegawai}
      rowKey={"kode_pegawai"}
      scrollX
      width={2000}
      onAddButtonClick={() => dispatch(helperRedux.showModal("Tambah"))}
    />
  );
};

export default TableDataPegawai;
