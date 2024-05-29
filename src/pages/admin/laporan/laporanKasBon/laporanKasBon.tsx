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
import TableLporanKasBon from "./table";
import { reduxLaporanKasBon } from "./redux";
import { validateKasBon } from "./validate";

const LaporanKasBon = (props: InjectedFormProps<FormFilterLaporanDto>) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanKasBon();

  useEffect(() => {
    dispatch(change("LaporanKasBon", "start_date", today));
    dispatch(change("LaporanKasBon", "end_date", today));
    dispatch(actionMaster.getDataToko());
    dispatch(simpanDataTmp({ data: [] }));
    return () => {
      dispatch(simpanDataTmp({ data: [] }));
    };
  }, [dispatch]);
  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };

  const datatoko = useAppSelector((state) => state.dataMaster.dataToko || []);

  return (
    <PanelContent title="Laporan Kas Bon">
      <form onSubmit={handleSubmit(filterLaporan)}>
        <div className="row">
          <div className="col-3">
            <Field
              label="Kode Toko"
              name="kode_toko"
              options={datatoko.data?.map((list) => {
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
      <TableLporanKasBon />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanKasBon",
  enableReinitialize: true,
  validate: validateKasBon,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanKasBon);
