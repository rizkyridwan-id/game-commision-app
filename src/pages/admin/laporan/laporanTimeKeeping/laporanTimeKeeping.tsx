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

const LaporanTimeKeeping = (props: InjectedFormProps<FormFilterLaporanDto>) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(change("LaporanTimeKeeping", "tgl_from", today));
    dispatch(change("LaporanTimeKeeping", "tgl_to", today));
  }, [dispatch]);
  const filterLaporan = () => {
    // dispatch(proses.cariLaporan());
  };

  return (
    <PanelContent title="Laporan Time Keeping">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-4">
            <Field
              label="Tanggal Awal"
              name="tgl_from"
              type="date"
              component={ReanderField}
            />
          </div>
          <div className="col-4">
            <Field
              label="Tanggal Akhir"
              name="tgl_to"
              type="date"
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
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanTimeKeeping",
  enableReinitialize: true,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanTimeKeeping);
