import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterShiftKerjaInterFace } from "@/interface";
import { useEffect } from "react";
import { Button } from "antd";

const TableParameterShiftKerja = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionParameter.getParameterShiftKerja());
  }, [dispatch]);

  const columnsTableParameterShiftKerja: ColumnInterFace<ParameterShiftKerjaInterFace>[] =
    [
      {
        title: "Tipe Shift",
        dataIndex: "type_shift",
        key: "type_shift",
      },
      {
        title: "Dari Jam Datang",
        dataIndex: "start_time",
        key: "start_time",
        align: "right",
      },
      {
        title: "Sampai Jam Datang",
        dataIndex: "due_time",
        key: "due_time",
        align: "right",
      },
      {
        title: "Jam Pulang",
        dataIndex: "work_end_time",
        key: "work_end_time",
        align: "right",
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
                    namaForm: "FormShiftKerja",
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
    (state) => state.parameter.parameterShiftKerja
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataParameter.data || []}
      columns={columnsTableParameterShiftKerja}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormShiftKerja",
          })
        )
      }
    />
  );
};

export default TableParameterShiftKerja;
