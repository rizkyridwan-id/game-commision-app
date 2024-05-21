import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterBonusSalesInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { parameterBonusRedux } from "../redux";

const TableParameterBonusSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterBonusRedux();

  useEffect(() => {
    dispatch(actionParameter.getParameterBonusSales());
  }, [dispatch]);

  const columnsTableParameterBonusSales: ColumnInterFace<ParameterBonusSalesInterFace>[] =
    [
      {
        title: "Bonus Beli",
        dataIndex: "bonus_beli",
        key: "bonus_beli",
        align: "right",
        render: (cell: number) => {
          return cell?.toLocaleString("kr-ko");
        },
      },
      {
        title: "Bonus Beli",
        dataIndex: "bonus_jual",
        key: "bonus_jual",
        align: "right",
        render: (cell: number) => {
          return cell?.toLocaleString("kr-ko");
        },
      },
      {
        title: "Bonus Beli",
        dataIndex: "bonus_hutang",
        key: "bonus_hutang",
        align: "right",
        render: (cell: number) => {
          return (
            <div className="text-end">{cell?.toLocaleString("kr-ko")}</div>
          );
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
    (state) => state.parameter.dataBonusSales
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataParameter.data || []}
      columns={columnsTableParameterBonusSales}
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

export default TableParameterBonusSales;
