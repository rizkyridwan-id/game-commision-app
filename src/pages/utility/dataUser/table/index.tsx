import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, DataUserInterFace } from "@/interface";
import { Button } from "antd";
import { ButtonDelete } from "@/utils";
import { useEffect } from "react";
import { datauserController } from "../redux";

const TableDataUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = datauserController();

  useEffect(() => {
    dispatch(actionMaster.getDataUser());
  }, [dispatch]);

  const columnsTableDataUser: ColumnInterFace<DataUserInterFace>[] = [
    {
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
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

  const dataUser = useAppSelector((state) => state.dataMaster.dataUser);

  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataUser.data}
      columns={columnsTableDataUser}
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

export default TableDataUser;
