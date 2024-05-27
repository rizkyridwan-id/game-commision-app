import { PanelContent, TableMaster } from "@/components";
import { ColumnInterFace, DashboardReviewCutiInterFace } from "@/interface";
import { getData, today, urlApi } from "@/utils";
import { useEffect, useState } from "react";
import { reduxForm } from "redux-form";

const DashbaordReviewCuti = () => {
  const columns: ColumnInterFace<DashboardReviewCutiInterFace>[] = [
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
      title: "Tanggal Pengajuan",
      dataIndex: "leave_start_date",
      key: "leave_start_date",
    },
    {
      title: "Alasan",
      dataIndex: "leave_description",
      key: "leave_description",
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

  const [data, setData] = useState<DashboardReviewCutiInterFace[]>([]);

  const getDataUltah = async () => {
    try {
      const response = await getData<DashboardReviewCutiInterFace[]>(
        urlApi.dashboard.cuti,
        {
          tgl_system: today,
        }
      );
      setData(response.data);
    } catch (error) {
      setData([]);
    }
  };
  return (
    <PanelContent title="Dashboard Review Cuti">
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
  form: "dashboardReviewCuti",
})(DashbaordReviewCuti);
