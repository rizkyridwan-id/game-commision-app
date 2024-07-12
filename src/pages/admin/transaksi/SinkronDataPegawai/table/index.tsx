import { TableMaster } from "@/components";
import { ColumnInterFace, SinkronDataPegawaiInterFace } from "@/interface";
import { AppDispatch, simpanDataTmp, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sinkronDataRedux } from "../redux";

const TableSinkronDataPegawai = () => {
  const dispatch = useDispatch<AppDispatch>();
  const proses = sinkronDataRedux();

  const columns: ColumnInterFace<SinkronDataPegawaiInterFace>[] = [
    {
      title: "Kode Sales",
      dataIndex: "kode_sales",
      key: "kode_sales",
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
      title: "Omset Penjualan Rupiah",
      dataIndex: "omzet_jual_rupiah",
      key: "omzet_jual_rupiah",
      align: "right",
      render(text) {
        return (
          <div className="text-end">
            {Number(text || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    {
      title: "Omset Penjualan Faktur",
      dataIndex: "omzet_jual_faktur",
      key: "omzet_jual_faktur",
      align: "right",
      render(text) {
        return (
          <div className="text-end">
            {Number(text || 0).toLocaleString("kr-ko")}
          </div>
        );
      },
    },
    // {
    //   title: "Omset Penjualan Berat",
    //   dataIndex: "omzet_jual_berat",
    //   key: "omzet_jual_berat",
    //   align: "right",
    //   render(text) {
    //     return <div className="text-end"> {Number(text || 0).toFixed(3)}</div>;
    //   },
    // },
    // {
    //   title: "Omset Hutang Rupiah",
    //   dataIndex: "omzet_hutang_lunas_rupiah",
    //   key: "omzet_hutang_lunas_rupiah",
    //   align: "right",
    //   render(text) {
    //     return (
    //       <div className="text-end">
    //         {Number(text || 0).toLocaleString("kr-ko")}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Omset Hutang Faktur",
    //   dataIndex: "omzet_hutang_lunas_faktur",
    //   key: "omzet_hutang_lunas_faktur",
    //   align: "right",
    //   render(text) {
    //     return (
    //       <div className="text-end">
    //         {Number(text || 0).toLocaleString("kr-ko")}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Omset Hutang Berat",
    //   dataIndex: "omzet_hutang_lunas_berat",
    //   key: "omzet_hutang_lunas_berat",
    //   align: "right",
    //   render(text) {
    //     return <div className="text-end"> {Number(text || 0).toFixed(3)}</div>;
    //   },
    // },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
  ];

  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as SinkronDataPegawaiInterFace[];

  useEffect(() => {
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <TableMaster
          dataSource={datatmp}
          columns={columns}
          rowKey={"_id"}
          // scrollX
          // width={1800}
          disabledSearch
        />
      </div>
      <div className="col-8 text-end"></div>
      <div className="col-4 text-end">
        <ButtonCustom
          disabled={datatmp.length > 0 ? false : true}
          block
          onClick={() => dispatch(proses.sinkronData())}
          color="primary"
        >
          {" "}
          Sinkron Data
        </ButtonCustom>
      </div>
    </div>
  );
};

export default TableSinkronDataPegawai;
