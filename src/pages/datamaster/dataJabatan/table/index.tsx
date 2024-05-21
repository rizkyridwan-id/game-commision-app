import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, DataJabatanInterFace } from "@/interface";
import { Button } from "antd";
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
          <Button
            type="primary"
            onClick={() =>
              dispatch(
                helperRedux.showModal({
                  isEdit: true,
                  title: "Edit Data",
                  namaForm: "FormDataUser",
                  data: row,
                })
              )
            }
          >
            <i className="fa fa-edit"></i>
          </Button>
          &nbsp;
          <ButtonDelete
            prosesDelete={() => dispatch(reduxUser.removeData(row._id))}
          />
        </div>
      ),
    },
  ];

  const dataUser = useAppSelector((state) => state.dataMaster.dataJabatan);
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataUser.data || []}
      columns={columnsTableDataJabatan}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataUser",
          })
        )
      }
    />
  );
};

export default TableDataJabatan;
