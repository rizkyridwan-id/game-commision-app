import { TableMaster } from "@/components";
import { ColumnInterFace, ReportPayrollGlobalDtoProps } from "@/interface";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import { ButtonCustom } from "@/utils";
import { useDispatch } from "react-redux";
import { reduxLaporanGlobalPayroll } from "../redux";

const TableLporanGlobalPayroll = () => {
  const columnsTableKasbon: ColumnInterFace<ReportPayrollGlobalDtoProps>[] = [
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
    {
      title: "Gaji Pokok",
      dataIndex: "gaji_pokok3",
      key: "gaji_pokok3",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "TJ.Jabatan",
      dataIndex: "tunjangan_jabatan",
      key: "tunjangan_jabatan",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },

    {
      title: "Bonus Sales",
      dataIndex: "bonus_sales",
      key: "bonus_sales",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Bonus Absen",
      dataIndex: "bonus_absen",
      key: "bonus_absen",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Bonus Jabatan",
      dataIndex: "bonus_jabatan",
      key: "bonus_jabatan",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Kasbon",
      dataIndex: "kasbon",
      key: "kasbon",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Cuti",
      dataIndex: "cuti",
      key: "cuti",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Pot.Lain",
      dataIndex: "potongan_lain",
      key: "potongan_lain",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (cell: number) => {
        return Number(cell || 0).toLocaleString("kr-ko");
      },
    },
  ];
  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as ReportPayrollGlobalDtoProps[];

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanGlobalPayroll();

  return (
    <div className="row mt-4">
      <TableMaster
        dataSource={datatmp}
        columns={columnsTableKasbon}
        rowKey={"_id"}
        scrollX
      />
      {datatmp?.length !== 0 && (
        <>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="warning"
              onClick={() => dispatch(proses.exportLaporan("PDF"))}
              block
            >
              Export Pdf
            </ButtonCustom>
          </div>
          <div className="col-6 mt-5">
            <ButtonCustom
              color="success"
              block
              onClick={() => dispatch(proses.exportLaporan("EXCEL"))}
            >
              Export Excel
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default TableLporanGlobalPayroll;
