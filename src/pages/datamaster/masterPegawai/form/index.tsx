import { AppDispatch, RootState, utilityActions } from "@/reduxStore";
import { ButtonCustom, HiddenField, ReanderField, RenderSelect } from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useDispatch,
  useEffect,
} from "@/package";
import { PegawaiInterface } from "../dto";
import { ConfigProps } from "redux-form";

type FormProps = {
  isEdit: boolean;
};

const FormPegawai = (
  props: InjectedFormProps<PegawaiInterface, FormProps, string> & FormProps
) => {
  const { handleSubmit, pristine, submitting, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();

  const simpan = async (data: PegawaiInterface) => {
    console.log(data);
    dispatch(utilityActions.setLoading({ screen: true }));
  };

  useEffect(() => {
    const kode_jenis = document.getElementById("kode_jenis");
    if (kode_jenis) {
      kode_jenis.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="kode_pegawai" type="hidden" component={HiddenField} />
      <div className="row">
        <div className="col-6">
          <div className="mb-20px">
            <Field
              label="Nama Pegawai"
              id="nama_peagwai"
              name="nama_peagwai"
              type="text"
              placeholder="Masukan Nama Pegawai"
              component={ReanderField}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-20px">
            <Field
              label="Tgl Lahir"
              id="tgl_lahir"
              name="tgl_lahir"
              type="date"
              placeholder="Masukan Jabatan"
              component={ReanderField}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-20px">
            <Field
              label="Jabatan"
              id="jabatan"
              name="jabatan"
              placeholder="Pilih Jabatan"
              options={[]}
              component={RenderSelect}
            />
          </div>
        </div>
        <div className="col-6 mt-4">
          <ButtonCustom
            disabled={pristine || submitting}
            color="primary"
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

const mapState = (state: RootState<PegawaiInterface>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        kode_pegawai: state?.utility?.getModal?.data?.kode_pegawai,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<PegawaiInterface, FormProps> = {
  form: "FormPegawai",
  enableReinitialize: true,
};

export default connector(
  reduxForm<PegawaiInterface, FormProps>(config)(FormPegawai)
);
