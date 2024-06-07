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

import { ButtonCustom } from "@/utils";

const TableKonversiCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

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
            <ButtonCustom
              color="primary"
              tooltipText="Edit Data"
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
            </ButtonCustom>
          </div>
        ),
      },
    ];

  const dataParameter = useAppSelector(
    (state) => state.parameter.parameterKonversiCuti
  );
  return (
    <TableMaster
      addButtonTitle={dataParameter.data.length > 0 ? undefined : "Tambah Data"}
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
