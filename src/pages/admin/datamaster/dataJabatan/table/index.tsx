import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, DataJabatanInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { dataJabatanRedux } from "../redux";

const TableDataJabatan = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = dataJabatanRedux();

  useEffect(() => {
    dispatch(actionMaster.getDataJabatan());
  }, [dispatch]);

  const columnsTableDataJabatan: ColumnInterFace<DataJabatanInterFace>[] = [
    {
      title: "Nama Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <ButtonDelete
            prosesDelete={() => dispatch(reduxUser.removeData(row._id))}
          />
        </div>
      ),
    },
  ];

  const dataJabatan = useAppSelector((state) => state.dataMaster.dataJabatan);
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataJabatan.data || []}
      columns={columnsTableDataJabatan}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataJabatan",
          })
        )
      }
    />
  );
};

export default TableDataJabatan;
