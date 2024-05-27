import { PanelContent, TableMaster } from "@/components";
import { ColumnInterFace, IReportTimeKeeping } from "@/interface";
import { AppDispatch, actionMaster, useAppSelector } from "@/reduxStore";
import {
  ButtonCustom,
  ReanderField,
  RenderSelect,
  getBgColor,
  timeout,
  today,
} from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Field, InjectedFormProps, change, reduxForm } from "redux-form";
import { reduxLaporanTimeKeeping } from "../../laporan/laporanTimeKeeping/redux";

const DashbaordTimeKeeping = (props: InjectedFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { handleSubmit } = props;

  const columns: ColumnInterFace<IReportTimeKeeping>[] = [
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
      title: "Datang",
      dataIndex: "jam_datang",
      key: "jam_datang",
      render: (text, row: IReportTimeKeeping) => {
        return {
          props: {
            style: {
              background: getBgColor({
                status: row.status_datang,
                type: "jam_datang",
              }),
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Pulang",
      dataIndex: "jam_pulang",
      key: "jam_pulang",
      render: (text, row: IReportTimeKeeping) => {
        return {
          props: {
            style: {
              background: getBgColor({
                status: row.status_pulang,
                type: "jam_pulang",
              }),
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Break",
      dataIndex: "total_break",
      key: "total_break",
      render: (text, row: IReportTimeKeeping) => {
        return {
          props: {
            style: {
              background: getBgColor({
                status: row.status_break,
                type: "isoma",
              }),
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Istirahat",
      dataIndex: "total_istirahat",
      key: "total_istirahat",
      render: (text, row: IReportTimeKeeping) => {
        return {
          props: {
            style: {
              background: getBgColor({
                status: row.status_istirahat,
                type: "isoma",
              }),
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Sholat",
      dataIndex: "total_sholat",
      key: "total_sholat",
      render: (text, row: IReportTimeKeeping) => {
        return {
          props: {
            style: {
              background: getBgColor({
                status: row.status_sholat,
                type: "isoma",
              }),
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
  ];

  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);
  const proses = reduxLaporanTimeKeeping();
  useEffect(() => {
    dispatch(actionMaster.getDataToko());
    getData();
  }, [dispatch]);

  const getData = async () => {
    await timeout(1000);
    dispatch(change("dashboardTimeKeeping", "tgl_system", today));
    dispatch(
      change("dashboardTimeKeeping", "kode_toko", dataToko?.data[0]?.kode_toko)
    );

    dispatch(proses.cariLaporan("DASHBOARD"));
  };

  const cariData = () => {
    dispatch(proses.cariLaporan("DASHBOARD"));
  };

  const datatmp = useAppSelector(
    (state) => state.utility.getDataTmp.data || []
  ) as IReportTimeKeeping[];

  return (
    <PanelContent title="Dashboard Time Keeping">
      <form onSubmit={handleSubmit(cariData)}>
        <div className="row">
          <div className="col-4">
            <Field
              label="Kode Toko"
              name="kode_toko"
              component={RenderSelect}
              placeholder="Pilih Kode Toko"
              options={dataToko.data.map((list) => {
                return {
                  value: list.kode_toko,
                  label: list.kode_toko,
                };
              })}
            />
          </div>
          <div className="col-4">
            <Field
              label="Tanggal"
              name="tgl_system"
              component={ReanderField}
              placeholder="Pilih Tanggal"
              type="date"
            />
          </div>
          <div className="col-4 mt-4">
            <ButtonCustom block type="submit" color="primary">
              Cari Data
            </ButtonCustom>
          </div>
        </div>
      </form>

      <TableMaster
        dataSource={datatmp || []}
        columns={columns}
        rowKey={"kode_pegawai"}
        scrollX
        width={800}
        disabledSearch
      />
    </PanelContent>
  );
};

export default reduxForm({
  form: "dashboardTimeKeeping",
})(DashbaordTimeKeeping);
