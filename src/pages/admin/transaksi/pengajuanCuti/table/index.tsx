import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionTransaksi,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PengajuanCutiInterFace } from "@/interface";
import { useEffect } from "react";
import { ButtonDelete } from "@/utils";
import { pengajuanCutiRedux } from "../redux";

const TabelPengajuanCuti = () => {
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const service = pengajuanCutiRedux();

  useEffect(() => {
    dispatch(
      actionTransaksi.getPengajuanCuti({
        namaForm: "Data Pengajuan Cuti",
      })
    );
  }, [dispatch]);

  const columnsTabelPengajuanCuti: ColumnInterFace<PengajuanCutiInterFace>[] = [
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <ButtonDelete
            disabled={row.status_validasi !== "OPEN" ? true : false}
            tooltipText="Batal Cuti"
            prosesDelete={() => dispatch(service.batalCuti(row))}
          />
        </div>
      ),
    },
    {
      title: "Status Validasi",
      dataIndex: "status_validasi",
      key: "status_validasi",
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
      title: "Tanggal Pengajuan Cuti",
      dataIndex: "tgl_system",
      key: "tgl_system",
    },
    {
      title: "Cuti Dari",
      dataIndex: "leave_start_date",
      key: "leave_start_date",
    },
    {
      title: "Cuti Sampai",
      dataIndex: "leave_end_date",
      key: "leave_end_date",
    },
    {
      title: "Alasan Cuti",
      dataIndex: "leave_description",
      key: "leave_description",
    },
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];

  const dataCuti = useAppSelector((state) => state.transaksi.dataPengajuanCuti);
  return (
    <TableMaster
      addButtonTitle="Tambah Pengajuan Cuti"
      dataSource={dataCuti.data || []}
      columns={columnsTabelPengajuanCuti}
      rowKey={"_id"}
      scrollX
      width={1500}
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

export default TabelPengajuanCuti;
