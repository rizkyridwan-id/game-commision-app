import {
  KodePegawaiSelector,
  PanelContent,
  TokoCabangSelector,
} from "@/components";
import { LemburInterFace } from "@/interface";
import { change, Field, InjectedFormProps, reduxForm } from "redux-form";
import { validateLembur } from "./validate";
import { LemburService } from "./redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reduxStore";
import { ButtonCustom, ReanderField, RenderNumber, today } from "@/utils";
import { useEffect } from "react";

const TransaksiLembur = (props: InjectedFormProps<LemburInterFace>) => {
  const { handleSubmit, pristine, submitting } = props;

  const service = LemburService();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(change("TransaksiLembur", "tgl_lembur", today));
  }, [dispatch]);

  return (
    <PanelContent title="Transaksi Lembur">
      <form onSubmit={handleSubmit(() => dispatch(service.saveLembur()))}>
        <div className="row">
          <TokoCabangSelector className="col-3" />
          <KodePegawaiSelector
            className="col-3"
            namaForm="TransaksiLembur"
            onClick={() => dispatch(service.cariDataPegawai())}
          />
          <div className="col-3">
            <Field
              label="Nama Pegawai"
              name="nama_pegawai"
              type="text"
              placeholder="Nama Pegawai"
              readOnly
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Jabatan"
              name="jabatan"
              type="text"
              placeholder="Jabatan"
              readOnly
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Tanggal Lembur"
              name="tgl_lembur"
              type="date"
              placeholder="Tanggal Lembur"
              component={ReanderField}
            />
          </div>
          <div className="col-3">
            <Field
              label="Jam Awal Lembur"
              name="jam_awal"
              type="time"
              placeholder="Jam Awal Lembur"
              component={ReanderField}
              onBlur={() => dispatch(service.cariParameterLembur())}
            />
          </div>
          <div className="col-3">
            <Field
              label="Jam Akhir Lembur"
              name="jam_akhir"
              type="time"
              placeholder="Jam Akhir Lembur"
              component={ReanderField}
              onBlur={() => dispatch(service.cariParameterLembur())}
            />
          </div>

          <div className="col-3">
            <Field
              label="Total Lembur"
              name="total_lembur"
              type="text"
              readOnly
              placeholder="Total Lembur"
              component={ReanderField}
              inputGroup
              textIconGroup="Menit"
              right
            />
          </div>
          <div className="col-3">
            <Field
              label="Total Rupiah / Jam"
              name="total_rp"
              type="text"
              isRp
              placeholder="Total Rupiah / Jam"
              component={RenderNumber}
            />
          </div>
          <div className="col-4">
            <Field
              label="Keterangan Lembur"
              name="keterangan"
              type="text"
              placeholder="Keterangan Lembur"
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
              Cetak Struk
            </ButtonCustom>
          </div>
        </div>
      </form>
    </PanelContent>
  );
};

export default reduxForm<LemburInterFace>({
  form: "TransaksiLembur",
  validate: validateLembur,
})(TransaksiLembur);
