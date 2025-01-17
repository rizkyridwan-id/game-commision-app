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
import { ButtonCustom } from "@/utils";

const TableParameterBonusSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionParameter.getParameterBonusSales());
  }, [dispatch]);

  const columnsTableParameterBonusSales: ColumnInterFace<ParameterBonusSalesInterFace>[] =
    [
      {
        title: "Bonus Jual",
        dataIndex: "bonus_jual",
        key: "bonus_jual",
        render: (cell: number) => {
          return <div>{Number(cell || 0)?.toLocaleString("kr-ko")}</div>;
        },
      },
      {
        title: "Bonus Beli",
        dataIndex: "bonus_beli",
        key: "bonus_beli",
        render: (cell: number) => {
          return <div>{Number(cell || 0)?.toLocaleString("kr-ko")}</div>;
        },
      },

      {
        title: "Bonus Hutang",
        dataIndex: "bonus_hutang",
        key: "bonus_hutang",
        render: (cell: number) => {
          return <div>{Number(cell || 0)?.toLocaleString("kr-ko")}</div>;
        },
      },
      {
        title: "Bonus Pelunasan Hutang",
        dataIndex: "bonus_pelunasan_hutang",
        key: "bonus_pelunasan_hutang",
        render: (cell: number) => {
          return <div>{Number(cell || 0)?.toLocaleString("kr-ko")}</div>;
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
    (state) => state.parameter.dataBonusSales
  );
  return (
    <TableMaster
      addButtonTitle={dataParameter.data.length > 0 ? undefined : "Tambah Data"}
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
