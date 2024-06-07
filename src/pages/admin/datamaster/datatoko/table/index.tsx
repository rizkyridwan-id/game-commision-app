import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, DataTokoInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete, HiddenText } from "@/utils";
import { dataTokoRedux } from "../redux";

const TableDataToko = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const reduxUser = dataTokoRedux();

  useEffect(() => {
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);

  const columnsTableDataToko: ColumnInterFace<DataTokoInterFace>[] = [
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Nama Toko",
      dataIndex: "nama_toko",
      key: "nama_toko",
    },
    {
      title: "Alamat Toko",
      dataIndex: "alamat_toko",
      key: "alamat_toko",
    },
    {
      title: "Portal",
      dataIndex: "portal",
      key: "portal",
      render(cell: string) {
        return <HiddenText text={cell} />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <ButtonDelete
            tooltipText="Hapus Data"
            prosesDelete={() => dispatch(reduxUser.removeData(row._id))}
          />
        </div>
      ),
    },
  ];

  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);
  return (
    <TableMaster
      addButtonTitle="Tambah Data"
      dataSource={dataToko.data || []}
      columns={columnsTableDataToko}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormdataToko",
          })
        )
      }
    />
  );
};

export default TableDataToko;
