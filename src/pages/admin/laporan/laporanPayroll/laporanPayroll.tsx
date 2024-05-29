import { PanelContent } from "@/components";
import { FormFilterLaporanDto } from "@/interface";
import { AppDispatch, actionMaster, useAppSelector } from "@/reduxStore";
import { ButtonCustom, ReanderField, RenderSelect, today } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ConfigProps,
  Field,
  InjectedFormProps,
  change,
  reduxForm,
} from "redux-form";
import { validatePayroll } from "./validate";
import TableLporanPayroll from "./table";
import { reduxLaporanPayroll } from "./redux";

const LaporanPayroll = (props: InjectedFormProps<FormFilterLaporanDto>) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPayroll();

  useEffect(() => {
    dispatch(change("LaporanPayroll", "start_period", today.slice(0, 7)));
    dispatch(change("LaporanPayroll", "end_period", today.slice(0, 7)));
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);
  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };
  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

  return (
    <PanelContent title="Laporan Payroll">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-3">
            <Field
              label="Kode Toko"
              name="kode_toko"
              options={dataToko.data.map((list) => {
                return {
                  value: list.kode_toko,
                  label: list.kode_toko,
                };
              })}
              placeholder="Pilih Kode Toko"
              component={RenderSelect}
            />
          </div>
          <div className="col-3">
            <Field
              label="Bulan Awal"
              name="start_period"
              type="month"
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Bulan Akhir"
              name="end_period"
              type="month"
              component={ReanderField}
            />
          </div>

          <div className="col-3 mt-4">
            <ButtonCustom
              color="primary"
              block
              type="submit"
              className="btn-lg"
            >
              Cari Laporan
            </ButtonCustom>
          </div>
        </div>
      </form>
      <TableLporanPayroll />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanPayroll",
  enableReinitialize: true,
  validate: validatePayroll,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanPayroll);
