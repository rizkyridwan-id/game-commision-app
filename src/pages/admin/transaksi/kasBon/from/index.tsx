import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderNumber,
  RenderTextArea,
  setFocusField,
  today,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useEffect,
} from "@/package";
import { ConfigProps, change } from "redux-form";

import { reduxKasBon } from "../redux";
import { useDispatch } from "react-redux";
import { KasBonInterFace } from "@/interface";
import { KodePegawaiSelector } from "@/components";
import { validasiKasbon } from "../validator";
type FormProps = {
  isEdit: boolean;
};

const FormKasBon = (
  props: InjectedFormProps<KasBonInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit } = props;

  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxKasBon();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("kode_pegawai");
    dispatch(change("FormKasBon", "tgl_system", today));
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <KodePegawaiSelector className="col-6" namaForm="FormKasBon" />
        <div className={"col-6"}>
          <Field
            label="Lama Cicilan"
            name="lama_cicilan"
            type="text"
            placeholder="Masukan Lama Cicilan"
            component={ReanderField}
            right
            inputGroup
            textIconGroup="Bulan"
          />
        </div>
        <div className={"col-12"}>
          <Field
            label="Total Kasbon"
            name="total_kasbon"
            type="text"
            isRp
            placeholder="Masukan Total Kasbon"
            component={RenderNumber}
          />
        </div>
        <div className={"col-12"}>
          <Field
            label="Alasan"
            name="alasan_kasbon"
            placeholder="Masukan Kasbon"
            component={RenderTextArea}
          />
        </div>

        <div className={`col-12 text-end mt-4`}>
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<KasBonInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
        nama_pegawai: state?.utility?.getModal?.data?.nama_pegawai,
        alasan_kasbon: state?.utility?.getModal?.data?.alasan_kasbon,
        total_kasbon: state?.utility?.getModal?.data?.total_kasbon,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<KasBonInterFace, FormProps> = {
  form: "FormKasBon",
  enableReinitialize: true,
  validate: validasiKasbon,
};

export default connector(
  reduxForm<KasBonInterFace, FormProps>(config)(FormKasBon)
);
