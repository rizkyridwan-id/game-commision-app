import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, KasBonInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { reduxKasBon } from "../redux";

const TableKasbon = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const proses = reduxKasBon();

  useEffect(() => {
    dispatch(
      actionTransaksi.getDataKasBon({
        namaForm: "Data Kasbon",
      })
    );
  }, [dispatch]);

  const columnsTableKasbon: ColumnInterFace<KasBonInterFace>[] = [
    {
      title: "Tanggal",
      dataIndex: "tgl_system",
      key: "tgl_system",
    },
    {
      title: "Kode Pegawai",
      dataIndex: "kode_pegawai",
      key: "kode_pegawai",
    },
    {
      title: "Nama Pegawai",
      dataIndex: "nama_pegawai",
      key: "nama_pegawai",
    },

    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Alasan Kasbon",
      dataIndex: "alasan_kasbon",
      key: "alasan_kasbon",
    },
    {
      title: "Lama Cicilan",
      dataIndex: "lama_cicilan",
      key: "lama_cicilan",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Cicil Rp",
      dataIndex: "cicil_rp",
      key: "cicil_rp",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Total Kasbon",
      dataIndex: "total_kasbon",
      key: "total_kasbon",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <ButtonDelete
            prosesDelete={() => dispatch(proses.removeData(row._id))}
          />
        </div>
      ),
    },
  ];

  const dataPelangaranPegawai = useAppSelector(
    (state) => state.transaksi.kasBon
  );
  return (
    <TableMaster
      addButtonTitle="Tambah Kasbon"
      dataSource={dataPelangaranPegawai.data || []}
      columns={columnsTableKasbon}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataKasbon",
          })
        )
      }
    />
  );
};

export default TableKasbon;
