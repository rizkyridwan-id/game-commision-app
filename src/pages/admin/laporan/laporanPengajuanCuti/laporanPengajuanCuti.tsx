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
import { reduxLaporanPengajuanCuti } from "./redux";
import TableLporanPenhajuanCuti from "./table";
import { validatePengajuanCuti } from "./validate";

const LaporanPengajuanCuti = (
  props: InjectedFormProps<FormFilterLaporanDto>
) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxLaporanPengajuanCuti();

  useEffect(() => {
    dispatch(change("LaporanPengajuanCuti", "start_date", today));
    dispatch(change("LaporanPengajuanCuti", "end_date", today));
    dispatch(actionMaster.getDataToko());
  }, [dispatch]);

  const filterLaporan = () => {
    dispatch(proses.cariLaporan());
  };

  const dataToko = useAppSelector((state) => state.dataMaster.dataToko);

  return (
    <PanelContent title="Laporan Pengajuan Cuti">
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
      <TableLporanPenhajuanCuti />
    </PanelContent>
  );
};

const config: ConfigProps<FormFilterLaporanDto> = {
  form: "LaporanPengajuanCuti",
  enableReinitialize: true,
  validate: validatePengajuanCuti,
};

export default reduxForm<FormFilterLaporanDto>(config)(LaporanPengajuanCuti);
