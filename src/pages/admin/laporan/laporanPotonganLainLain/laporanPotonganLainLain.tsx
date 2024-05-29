import { PanelContent } from "@/components";
import { FormFilterLaporanDto } from "@/interface";
import {
  AppDispatch,
  actionMaster,
  simpanDataTmp,
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
import TableLporanPotonganLain from "./table";
import { reduxLaporanPotonganLainLain } from "./redux";
import { validatePotonganLain } from "./validate";

const LaporanPotonganLainLain = (
  props: InjectedFormProps<FormFilterLaporanDto>
) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPotonganLainLain();

  useEffect(() => {
    dispatch(change("LaporanPotonganLainLain", "start_date", today));
    dispatch(change("LaporanPotonganLainLain", "end_date", today));
    dispatch(actionMaster.getDataToko());
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };
  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

  return (
    <PanelContent title="Laporan Potongan Lain Lain">
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
              label="Tanggal Awal"
              name="start_date"
              type="date"
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Tanggal Akhir"
              name="end_date"
              type="date"
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
      <TableLporanPotonganLain />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanPotonganLainLain",
  enableReinitialize: true,
  validate: validatePotonganLain,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanPotonganLainLain);
