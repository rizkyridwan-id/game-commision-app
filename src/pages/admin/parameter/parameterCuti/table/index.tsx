import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterCutiInterFace } from "@/interface";
import { useEffect } from "react";
import { Button } from "antd";

const TableParameterCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionParameter.getParameterCuti());
  }, [dispatch]);

  const columnsTableParameterCuti: ColumnInterFace<ParameterCutiInterFace>[] = [
    {
      title: "Jangka Waktu Pengajuan Cuti",
      dataIndex: "leave_request_gap_days",
      key: "leave_request_gap_days",
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
        </div>
      ),
    },
  ];

  const dataParameter = useAppSelector(
    (state) => state.parameter.parameterCuti
  );
  return (
    <TableMaster
      addButtonTitle={dataParameter.data.length > 0 ? undefined : "Tambah Data"}
      dataSource={dataParameter.data || []}
      columns={columnsTableParameterCuti}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormCuti",
          })
        )
      }
    />
  );
};

export default TableParameterCuti;
