import {
  KodePegawaiSelector,
  PanelContent,
  TokoCabangSelector,
} from "@/components";
import { change, Field, InjectedFormProps, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reduxStore";
import { ButtonCustom, ReanderField } from "@/utils";
import { useEffect } from "react";
import { reportLemburService } from "./redux";
import { LaporanLemburDto } from "./dto";
import TableLembur from "./table";

const LaporanTransaksiLembur = (props: InjectedFormProps<LaporanLemburDto>) => {
  const { handleSubmit, pristine, submitting } = props;

  const service = reportLemburService();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 7);
    dispatch(change("LaporanTransaksiLembur", "tgl_awal", formattedDate));
    dispatch(change("LaporanTransaksiLembur", "tgl_akhir", formattedDate));
  }, [dispatch]);

  return (
    <PanelContent title="Transaksi Lembur">
      <form onSubmit={handleSubmit(() => dispatch(service.getReportLembur()))}>
        <div className="row">
          <TokoCabangSelector className="col-3" />
          <KodePegawaiSelector
            className="col-3"
            namaForm="LaporanTransaksiLembur"
          />
          <div className="col-3">
            <Field
              label="Tanggal Awal"
              name="tgl_awal"
              type="month"
              placeholder="Tanggal Awal"
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Tanggal Akhir"
              name="tgl_akhir"
              type="month"
              placeholder="Tanggal Akhir"
              component={ReanderField}
            />
          </div>

          <div className="col-3 mt-4">
            <ButtonCustom
              color="primary"
              block
              disabled={pristine || submitting}
              type="submit"
              className="btn-lg"
            >
              Cetak Laporan
            </ButtonCustom>
          </div>
        </div>
      </form>
      <div className="mt-4">
        <TableLembur />
      </div>
    </PanelContent>
  );
};

export default reduxForm<LaporanLemburDto>({
  form: "LaporanTransaksiLembur",
})(LaporanTransaksiLembur);
