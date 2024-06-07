import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterTargetInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonCustom } from "@/utils";

const TableTargetSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionParameter.getParameterTargetSales());
  }, [dispatch]);

  const columnsTableTargetSales: ColumnInterFace<ParameterTargetInterFace>[] = [
    {
      title: "Tipe Target",
      dataIndex: "tipe_target",
      key: "tipe_target",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
      align: "right",
      render: (cell: number) => {
        return Number(cell || 0)?.toLocaleString("kr-ko");
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
                  namaForm: "FormDataUser",
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
    (state) => state.parameter.parameterTargetSales
  );
  return (
    <TableMaster
      addButtonTitle={dataParameter.data.length > 0 ? undefined : "Tambah Data"}
      dataSource={dataParameter.data || []}
      columns={columnsTableTargetSales}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormParameterBonus",
          })
        )
      }
    />
  );
};

export default TableTargetSales;
