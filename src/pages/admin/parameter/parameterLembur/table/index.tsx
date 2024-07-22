import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionParameter,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, ParameterLemburInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonCustom, ButtonDelete } from "@/utils";
import { parameterLemburRedux } from "../redux";

const TableParameterLembur = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();

  useEffect(() => {
    dispatch(actionParameter.getParameterLembur());
  }, [dispatch]);

  const proses = parameterLemburRedux();

  const columnsTableParameterLembur: ColumnInterFace<ParameterLemburInterFace>[] =
    [
      {
        title: "Kode Toko",
        dataIndex: "kode_toko",
        key: "kode_toko",
      },
      {
        title: "Jam Awal",
        dataIndex: "jam_awal",
        key: "jam_awal",
      },
      {
        title: "Jam Akhir",
        dataIndex: "jam_akhir",
        key: "jam_akhir",
      },
      {
        title: "Total Rp",
        dataIndex: "total_rp",
        key: "total_rp",
        render: (cell: number) => (
          <div className="">{cell.toLocaleString("kr-ko")}</div>
        ),
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
            &nbsp;
            <ButtonDelete
              tooltipText="Hapus Data"
              prosesDelete={() => dispatch(proses.removeData(row._id))}
            />
          </div>
        ),
      },
    ];

  const dataParameter = useAppSelector(
    (state) => state.parameter.parameterLembur
  );
  return (
    <TableMaster
      addButtonTitle={"Tambah Data"}
      dataSource={dataParameter.data || []}
      columns={columnsTableParameterLembur}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormLembur",
          })
        )
      }
    />
  );
};

export default TableParameterLembur;
