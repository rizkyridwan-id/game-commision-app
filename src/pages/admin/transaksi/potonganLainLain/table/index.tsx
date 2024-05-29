import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PotonganLainInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { potonganLainRedux } from "../redux";

const TabelPotonganLainLain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const proses = potonganLainRedux();

  useEffect(() => {
    dispatch(
      actionTransaksi.getPotonganLain({
        namaForm: "Data Potongan",
      })
    );
  }, [dispatch]);

  const columnsTabelPotonganLainLain: ColumnInterFace<PotonganLainInterFace>[] =
    [
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
        title: "Tanggal",
        dataIndex: "tgl_system",
        key: "tgl_system",
      },

      {
        title: "Qty Cicilan",
        dataIndex: "qty_cicil_bulan",
        key: "qty_cicil_bulan",
        render: (text: number) => {
          return text;
        },
      },
      {
        title: "Saldo Rp",
        dataIndex: "saldo_rp",
        key: "saldo_rp",
        render: (text: number) => {
          return Number(text || 0).toLocaleString("kr-ko");
        },
      },
      {
        title: "Cicilan Rp",
        dataIndex: "cicil_rp",
        key: "cicil_rp",
        render: (text: number) => {
          return Number(text || 0).toLocaleString("kr-ko");
        },
      },
      {
        title: "Total Rp",
        dataIndex: "total_rp",
        key: "total_rp",
        render: (text: number) => {
          return Number(text || 0).toLocaleString("kr-ko");
        },
      },
      {
        title: "Alasan",
        dataIndex: "alasan",
        key: "alasan",
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

  const dataPotongan = useAppSelector((state) => state.transaksi.potonganLain);
  return (
    <TableMaster
      addButtonTitle="Tambah Potongan"
      dataSource={dataPotongan.data || []}
      columns={columnsTabelPotonganLainLain}
      rowKey={"_id"}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormDataJabatan",
          })
        )
      }
    />
  );
};

export default TabelPotonganLainLain;
