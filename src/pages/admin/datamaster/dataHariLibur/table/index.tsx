import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, HariLiburInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonCustom, ButtonDelete, convertDate } from "@/utils";
import { dataHariLiburRedux } from "../redux";

const TableHariLibur = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = dataHariLiburRedux();

  useEffect(() => {
    dispatch(actionMaster.getDataHariLibur());
  }, [dispatch]);

  const columnsTableHariLibur: ColumnInterFace<HariLiburInterFace>[] = [
    {
      title: "Tanggal Libur",
      dataIndex: "tgl_libur",
      key: "tgl_libur",
      render(text) {
        return convertDate(text, true);
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
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
            prosesDelete={() => dispatch(reduxUser.removeData(row._id))}
          />
        </div>
      ),
    },
  ];

  const dataUser = useAppSelector((state) => state.dataMaster.dataHariLibur);
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataUser.data || []}
      columns={columnsTableHariLibur}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataUser",
          })
        )
      }
    />
  );
};

export default TableHariLibur;
