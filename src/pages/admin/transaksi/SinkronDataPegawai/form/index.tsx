import { AppDispatch } from "@/reduxStore";
import { ButtonCustom, ReanderField } from "@/utils";
import { Field, InjectedFormProps, reduxForm, useEffect } from "@/package";
import { ConfigProps, change } from "redux-form";
import { useDispatch } from "react-redux";
import { SinkronDataPegawaiInterFace } from "@/interface";
import { TokoCabangSelector } from "@/components";
import { validateSinkronDataPegawai } from "../validate";
import { sinkronDataRedux } from "../redux";

const FormSinkronDataPegawai = (
  props: InjectedFormProps<SinkronDataPegawaiInterFace>
) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = sinkronDataRedux();

  const simpan = async () => {
    dispatch(proses.cariData());
  };

  useEffect(() => {
    dispatch(change("FormSinkronDataPegawai", "status_validasi", "OPEN"));
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <div className="row">
        <TokoCabangSelector className="col-4" />
        <div className={"col-4"}>
          <Field
            label="Kode Pegawai"
            name="kode_pegawai"
            type="text"
            placeholder="Masukan Kode Pegawai"
            component={ReanderField}
          />
        </div>
        <div className={`col-4 text-end mt-4`}>
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
            block
            type="submit"
            className="btn-lg"
          >
            Cari Data
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const config: ConfigProps<SinkronDataPegawaiInterFace> = {
  form: "FormSinkronDataPegawai",
  enableReinitialize: true,
  validate: validateSinkronDataPegawai,
};

export default reduxForm<SinkronDataPegawaiInterFace>(config)(
  FormSinkronDataPegawai
);
