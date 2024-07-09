import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
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
import { HariLiburInterFace } from "@/interface";
import { validateHariLibur } from "../validate";
import { useDispatch } from "react-redux";
import { dataHariLiburRedux } from "../redux";
import { TokoCabangSelector } from "@/components";

// import { datauserController } from "../redux";
type FormProps = {
  isEdit: boolean;
};

const FormHariLibur = (
  props: InjectedFormProps<HariLiburInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit, pristine, submitting } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = dataHariLiburRedux();

  const simpan = async () => {
    // const hakaskses = utility.getDataTmp.data as HakAksesInterFace[];
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("tgl_libur");
    if (!isEdit) {
      dispatch(change("FormHariLibur", "tgl_libur", today));
    }
  }, [dispatch]);
  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <TokoCabangSelector className="col-6" />
        <div className={"col-6"}>
          <Field
            label="Tanggal Libur"
            id="tgl_libur"
            name="tgl_libur"
            type="date"
            placeholder="Masukan Tanggal Libur"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Deskripsi"
            name="deskripsi"
            type="text"
            placeholder="Masukan Deskripsi"
            component={ReanderField}
          />
        </div>

        <div className={`col-6 text-end mt-4`}>
          {isEdit && <> &nbsp;</>}
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

const mapState = (state: RootState<HariLiburInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        deskripsi: state?.utility?.getModal?.data?.deskripsi,
        tgl_libur: state?.utility?.getModal?.data?.tgl_libur,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<HariLiburInterFace, FormProps> = {
  form: "FormHariLibur",
  enableReinitialize: true,
  validate: validateHariLibur,
};

export default connector(
  reduxForm<HariLiburInterFace, FormProps>(config)(FormHariLibur)
);
