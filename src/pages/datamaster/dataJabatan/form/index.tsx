import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
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
import { DataJabatanInterFace } from "@/interface";
import { validateJabatan } from "../validate";

import { dataJabatanRedux } from "../redux";
import { useDispatch } from "react-redux";
type FormProps = {
  isEdit: boolean;
};

const FormDataJabatan = (
  props: InjectedFormProps<DataJabatanInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const proses = dataJabatanRedux();
  const dispatch = useDispatch<AppDispatch>();

  const simpan = () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("jabatan");
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className={"col-6"}>
          <Field
            id="jabatan"
            label="Jabatan"
            name="jabatan"
            type="text"
            placeholder="Masukan Jabatan"
            component={ReanderField}
          />
        </div>

        <div className={`col-6 text-end mt-4`}>
          {isEdit && <> &nbsp;</>}
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<DataJabatanInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        jabatan: state?.utility?.getModal?.data?.jabatan,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<DataJabatanInterFace, FormProps> = {
  form: "FormDataJabatan",
  enableReinitialize: true,
  validate: validateJabatan,
};

export default connector(
  reduxForm<DataJabatanInterFace, FormProps>(config)(FormDataJabatan)
);
