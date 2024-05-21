import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterKonversiCutiInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { parameterKonversiCutiaRedux } from "../redux";
import { Button } from "antd";

const TableKonversiCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterKonversiCutiaRedux();

  useEffect(() => {
    dispatch(actionParameter.getParameterKonversiCuti());
  }, [dispatch]);

  const columnsTableKonversiCuti: ColumnInterFace<ParameterKonversiCutiInterFace>[] =
    [
      {
        title: "Total Rp",
        dataIndex: "total_rp",
        key: "total_rp",
        render: (cell) => {
          return Number(cell || 0).toLocaleString("kr-ko");
        },
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
                    namaForm: "FormKonversiCutia",
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
    (state) => state.parameter.parameterKonversiCuti
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataParameter.data || []}
      columns={columnsTableKonversiCuti}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormKonversiCutia",
          })
        )
      }
    />
  );
};

export default TableKonversiCuti;
