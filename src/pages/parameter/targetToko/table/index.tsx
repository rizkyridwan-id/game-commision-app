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
import { parameterTargetTokoRedux } from "../redux";

const TableTargetToko = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterTargetTokoRedux();

  useEffect(() => {
    dispatch(actionParameter.getParameterTargetToko());
  }, [dispatch]);

  const columnsTableTargetToko: ColumnInterFace<ParameterTargetInterFace>[] = [
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
    (state) => state.parameter.parameterTargetToko
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataParameter.data || []}
      columns={columnsTableTargetToko}
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

export default TableTargetToko;
