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
import { parameterCutiRedux } from "../redux";

const TableParameterCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = parameterCutiRedux();

  useEffect(() => {
    dispatch(actionParameter.getParameterCuti());
  }, [dispatch]);

  const columnsTableParameterCuti: ColumnInterFace<ParameterTargetInterFace>[] =
    [
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
    (state) => state.parameter.parameterCuti
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
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
