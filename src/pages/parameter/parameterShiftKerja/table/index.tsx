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
import { ButtonDelete } from "@/utils";
import { parameterShiftKerjaRedux } from "../redux";
import { Button } from "antd";

const TableParameterShiftKerja = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterShiftKerjaRedux();

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
        dataIndex: "dari_jam_datang",
        key: "dari_jam_datang",
        align: "right",
      },
      {
        title: "Sampai Jam Datang",
        dataIndex: "sampai_jam_datang",
        key: "sampai_jam_datang",
        align: "right",
      },
      {
        title: "Jam Pulang",
        dataIndex: "jam_pulang",
        key: "jam_pulang",
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
            &nbsp;
            <ButtonDelete
              prosesDelete={() => dispatch(reduxUser.removeData(row._id))}
            />
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
