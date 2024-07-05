import { PanelContent, TableMaster, TokoCabangSelector } from "@/components";
import { ColumnInterFace, IReportTimeKeeping } from "@/interface";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import {
  ButtonCustom,
  ReanderField,
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
          // children: <div>{text}</div>,
          children: <div>{row.status_datang === "LIBUR" ? "LIBUR" : text}</div>,
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
          children: <div>{row.status_pulang === "LIBUR" ? "LIBUR" : text}</div>,
        };
      },
    },
    {
      title: "Break / Menit",
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
          children: <div>{row.status_break === "LIBUR" ? "LIBUR" : text}</div>,
        };
      },
    },
    {
      title: "Istirahat / Menit",
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
          // children: <div>{text}</div>,
          children: (
            <div>{row.status_istirahat === "LIBUR" ? "LIBUR" : text}</div>
          ),
        };
      },
    },
    {
      title: "Sholat / Menit",
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
          children: <div>{row.status_sholat === "LIBUR" ? "LIBUR" : text}</div>,
        };
      },
    },
  ];

  const proses = reduxLaporanTimeKeeping();
  useEffect(() => {
    getData();
  }, [dispatch]);

  const getData = async () => {
    await timeout(1000);
    dispatch(change("dashboardTimeKeeping", "start_date", today));
    dispatch(change("dashboardTimeKeeping", "end_date", today));

    setTimeout(() => {
      dispatch(proses.cariLaporan("DASHBOARD"));
    }, 300);
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
          <TokoCabangSelector className="col-3" />
          <div className="col-3">
            <Field
              label="Tgl Awal"
              name="start_date"
              component={ReanderField}
              placeholder="Pilih Tanggal"
              type="date"
            />
          </div>
          <div className="col-3">
            <Field
              label="Tgl Akhir"
              name="end_date"
              component={ReanderField}
              placeholder="Pilih Tanggal"
              type="date"
            />
          </div>
          <div className="col-3 mt-4">
            <ButtonCustom block type="submit" color="primary">
              Cari Data
            </ButtonCustom>
          </div>
        </div>
      </form>

      <TableMaster
        dataSource={datatmp || []}
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
  form: "dashboardTimeKeeping",
})(DashbaordTimeKeeping);
