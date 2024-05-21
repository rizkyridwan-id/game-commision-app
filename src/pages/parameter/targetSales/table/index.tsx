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
import { ButtonDelete } from "@/utils";
import { parameterTargetSalesRedux } from "../redux";

const TableTargetSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterTargetSalesRedux();

  useEffect(() => {
    dispatch(actionParameter.getParameterBonusSales());
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
        return cell?.toLocaleString("kr-ko");
      },
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

  const dataParameter = useAppSelector(
    (state) => state.parameter.parameterTargetSales
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
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
