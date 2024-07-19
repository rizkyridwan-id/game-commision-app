import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderNumber,
  setFocusField,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useEffect,
} from "@/package";
import { ConfigProps } from "redux-form";
import { ParameterLemburInterFace } from "@/interface";

import { parameterLemburRedux } from "../redux";
import { useDispatch } from "react-redux";
import { validateParameterLembur } from "../validate";
import { TokoCabangSelector } from "@/components";
type FormProps = {
  isEdit: boolean;
};

const FormPengajuanLembur = (
  props: InjectedFormProps<ParameterLemburInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterLemburRedux();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("target");
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <TokoCabangSelector className="col-6" />
        <div className={"col-6"}>
          <Field
            label="Jam Awal"
            id="jam_awal"
            name="jam_awal"
            type="time"
            placeholder="Masukan Jam Awal"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Jam Akhir"
            id="jam_akhir"
            name="jam_akhir"
            type="time"
            placeholder="Masukan Jam Akhir"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Total Rupiah"
            id="total"
            name="total"
            type="text"
            isRp
            placeholder="Masukan Total Rupiah"
            component={RenderNumber}
            inputGroup
            textIconGroup="Rp"
            right
          />
        </div>

        <div className={`col-12 text-end mt-4`}>
          <ButtonCustom
            color="primary"
            disabled={pristine || submitting}
            block
            type="submit"
            className="btn-lg"
          >
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<ParameterLemburInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        kode_toko: state?.utility?.getModal?.data?.kode_toko,
        jam_awal: state?.utility?.getModal?.data?.jam_awal,
        jam_akhir: state?.utility?.getModal?.data?.jam_akhir,
        total: state?.utility?.getModal?.data?.total,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterLemburInterFace, FormProps> = {
  form: "FormLembur",
  enableReinitialize: true,
  validate: validateParameterLembur,
};

export default connector(
  reduxForm<ParameterLemburInterFace, FormProps>(config)(FormPengajuanLembur)
);
