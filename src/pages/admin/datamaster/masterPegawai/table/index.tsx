import { TableMaster } from "@/components";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  actionMaster,
  useAppSelector,
  utilityController,
} from "@/reduxStore";
import { ColumnInterFace, PegawaiInterface } from "@/interface";
import { ButtonCustom, ButtonDelete, convertDate } from "@/utils";
import { useEffect } from "react";
import { dataPegawaiRedux } from "../redux";

interface Props {
  form?: string;
  changeKodePegawai?: (value: PegawaiInterface[]) => void | undefined;
}
const TableDataPegawai = (props: Props) => {
  const { form, changeKodePegawai } = props;
  const dispatch = useDispatch<AppDispatch>();
  const helperRedux = utilityController();
  const proses = dataPegawaiRedux();
  useEffect(() => {
    dispatch(actionMaster.getDataPegawai());
  }, [dispatch]);

  const columnsTablePegawai: ColumnInterFace<PegawaiInterface>[] = [
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_cell, row) => (
        <div className="text-center">
          <ButtonCustom
            color="primary"
            tooltipText="Edit Data Pegawai"
            onClick={() =>
              dispatch(
                helperRedux.showModal({
                  isEdit: true,
                  title: "Edit Data",
                  namaForm: "FormPegawai",
                  data: row,
                })
              )
            }
          >
            <i className="fa fa-edit"></i>
          </ButtonCustom>
          &nbsp;
          <ButtonCustom
            type="button"
            color="yellow"
            tooltipText="Edit Fingerprint"
            onClick={() => dispatch(proses.showFingerPrint(row))}
          >
            <i className="fa fa-fingerprint"></i>
          </ButtonCustom>
          &nbsp;
          <ButtonCustom
            type="button"
            color="black"
            tooltipText="Update Pin"
            onClick={() =>
              dispatch(
                helperRedux.showModal({
                  isEdit: false,
                  title: "Update Pin",
                  namaForm: "FormUpdatePin",
                  data: row,
                })
              )
            }
          >
            <i className="fa fa-key"></i>
          </ButtonCustom>
          &nbsp;
          <ButtonDelete
            tooltipText="Hapus Data"
            prosesDelete={() => dispatch(proses.removeData(row._id))}
          />
          &nbsp;
        </div>
      ),
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
      title: "Tgl Lahir",
      dataIndex: "tgl_lahir",
      key: "tgl_lahir",
      render(value) {
        return <div> {convertDate(value, true)} </div>;
      },
    },
    {
      title: "Jabatan",
      dataIndex: "jabatan",
      key: "jabatan",
    },
    {
      title: "Hari Libur",
      dataIndex: "hari_libur",
      key: "hari_libur",
    },
    {
      title: "Shift",
      dataIndex: "type_shift",
      key: "type_shift",
    },
    {
      title: "Lama Istirahat",
      dataIndex: "daily_rest_minute",
      key: "daily_rest_minute",
    },
    {
      title: "Lama Sholat",
      dataIndex: "daily_sholat_minute",
      key: "daily_sholat_minute",
    },
    {
      title: "Lama Break",
      dataIndex: "daily_break_minute",
      key: "daily_break_minute",
    },
    {
      title: "Jatah Cuti",
      dataIndex: "cuti_tahunan",
      key: "cuti_tahunan",
    },
    {
      title: "Gajih Pokok",
      dataIndex: "gaji_pokok",
      key: "gaji_pokok",
      render(text: number) {
        return <div>{Number(text || 0)?.toLocaleString("kr-ko")}</div>;
      },
    },
    {
      title: "Tunjangan Jabatan",
      dataIndex: "tunjangan_jabatan",
      key: "tunjangan_jabatan",
      render(text: number) {
        return <div>{Number(text || 0)?.toLocaleString("kr-ko")}</div>;
      },
    },
    {
      title: "Kode Sales",
      dataIndex: "kode_sales",
      key: "kode_sales",
    },
    {
      title: "Kode Toko",
      dataIndex: "kode_toko",
      key: "kode_toko",
    },
  ];

  const dataPegawai = useAppSelector((state) => state.dataMaster.dataPegawai);
  const rowSelection = {
    onChange: (
      _selectedRowKeys: React.Key[],
      selectedRows: PegawaiInterface[]
    ) => {
      if (selectedRows) {
        changeKodePegawai?.(selectedRows);
      }
    },
    getCheckboxProps: (record: PegawaiInterface) => ({
      disabled: record.kode_pegawai === "Disabled User", // Column configuration not to be checked
      name: record.kode_pegawai,
    }),
  };
  return (
    <TableMaster
      addButtonTitle={form === "pencarian_pegawai" ? undefined : "Tambah Data"}
      dataSource={dataPegawai.data}
      columns={columnsTablePegawai.filter((column) => {
        if (form === "pencarian_pegawai" && column.key === "actions") {
          return false; // Skip the "Actions" column
        }
        return true; // Include all other columns
      })}
      rowKey={"kode_pegawai"}
      scrollX
      width={2000}
      rowSelection={form && { type: "radio", ...rowSelection }}
      onAddButtonClick={() =>
        dispatch(
          helperRedux.showModal({
            isEdit: false,
            title: "Tambah Data",
            namaForm: "FormPegawai",
          })
        )
      }
    />
  );
};

export default TableDataPegawai;
