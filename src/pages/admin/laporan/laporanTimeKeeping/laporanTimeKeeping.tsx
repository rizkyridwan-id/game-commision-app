import { PanelContent } from "@/components";
import { FormFilterLaporanDto } from "@/interface";
import {
  AppDispatch,
  actionMaster,
  actionParameter,
  useAppSelector,
} from "@/reduxStore";
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
import TableLaproanTimeKeeping from "./table";
import { reduxLaporanTimeKeeping } from "./redux";

const LaporanTimeKeeping = (props: InjectedFormProps<FormFilterLaporanDto>) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(change("LaporanTimeKeeping", "tgl_system", today));
    dispatch(actionMaster.getDataToko());
    dispatch(actionParameter.getParameterShiftKerja());
  }, [dispatch]);
  const proses = reduxLaporanTimeKeeping();

  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };
  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);
  const dataShiftKerja = useAppSelector(
    (state) => state.parameter.parameterShiftKerja
  );

  return (
    <PanelContent title="Laporan Time Keeping">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-3">
            <Field
              label="Tanggal"
              name="tgl_system"
              type="date"
              component={ReanderField}
            />
          </div>
          <div className="col-2">
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
          <div className="col-2">
            <Field
              label="Type Shift"
              name="type_shift"
              component={RenderSelect}
              placeholder="Pilih Type Shift"
              options={dataShiftKerja.data.map((list) => {
                return {
                  value: list.type_shift,
                  label: list.type_shift,
                };
              })}
            />
          </div>
          <div className="col-3">
            <Field
              label="Type Time Keeping"
              name="type_time_keeping"
              component={RenderSelect}
              placeholder="Pilih Type Time Keeping"
              options={[
                {
                  value: "KEHADIRAN",
                  label: "KEHADIRAN",
                },
                {
                  value: "BREAK",
                  label: "BREAK",
                },
                {
                  value: "SHOLAT",
                  label: "SHOLAT",
                },
                {
                  value: "ISTIRAHAT",
                  label: "ISTIRAHAT",
                },
              ]}
            />
          </div>

          <div className="col-2 mt-4">
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
      <TableLaproanTimeKeeping />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanTimeKeeping",
  enableReinitialize: true,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanTimeKeeping);
