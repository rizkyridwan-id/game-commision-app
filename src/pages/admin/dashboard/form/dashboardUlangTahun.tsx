import { PanelContent, TableMaster } from "@/components";
import { ColumnInterFace, PegawaiInterface } from "@/interface";
import { VITE_APP_KODE_TOKO, getData, isPusat, today, urlApi } from "@/utils";
import { useEffect, useState } from "react";
import { reduxForm } from "redux-form";

const DashbaordUlangTahun = () => {
  const columns: ColumnInterFace<PegawaiInterface>[] = [
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
      title: "Tanggal Ultah",
      dataIndex: "tgl_lahir",
      key: "tgl_lahir",
    },
    {
      title: "Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];

  useEffect(() => {
    getDataUltah();
  }, []);

  const [data, setData] = useState<PegawaiInterface[]>([]);

  const getDataUltah = async () => {
    try {
      const response = await getData<PegawaiInterface[]>(urlApi.dashboard.hbd, {
        tgl_system: today,
        kode_toko: isPusat ? undefined : `${VITE_APP_KODE_TOKO}`,
      });
      setData(response.data);
    } catch (error) {
      setData([]);
    }
  };
  return (
    <PanelContent title="Dashboard Ulang Tahun">
      <TableMaster
        dataSource={data}
        columns={columns}
        rowKey={"_id"}
        scrollX
        width={800}
        disabledSearch
      />
    </PanelContent>
  );
};

export default reduxForm({
  form: "DashbaordUlangTahun",
})(DashbaordUlangTahun);
