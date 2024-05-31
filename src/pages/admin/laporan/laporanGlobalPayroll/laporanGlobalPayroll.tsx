import { PanelContent } from "@/components";
import { FormFilterLaporanDto } from "@/interface";
import { AppDispatch } from "@/reduxStore";
import { ButtonCustom, ReanderField, today } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ConfigProps,
  Field,
  InjectedFormProps,
  change,
  reduxForm,
} from "redux-form";
import { validateLaporanGlobalPayroll } from "./validate";
import TableLporanGlobalPayroll from "./table";
import { reduxLaporanGlobalPayroll } from "./redux";

const LaporanGlobalPayroll = (
  props: InjectedFormProps<FormFilterLaporanDto>
) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanGlobalPayroll();

  useEffect(() => {
    dispatch(change("LaporanGlobalPayroll", "start_period", today.slice(0, 7)));
    dispatch(change("LaporanGlobalPayroll", "end_period", today.slice(0, 7)));
  }, [dispatch]);
  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };

  return (
    <PanelContent title="Laporan Global Payroll">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-4">
            <Field
              label="Tanggal Awal"
              name="start_period"
              type="month"
              component={ReanderField}
            />
          </div>
          <div className="col-4">
            <Field
              label="Tanggal Akhir"
              name="end_period"
              type="month"
              component={ReanderField}
            />
          </div>

          <div className="col-4 mt-4">
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
      <TableLporanGlobalPayroll />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanGlobalPayroll",
  enableReinitialize: true,
  validate: validateLaporanGlobalPayroll,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanGlobalPayroll);
