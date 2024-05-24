import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
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
import { ParameterKonversiCutiInterFace } from "@/interface";

import { parameterKonversiCutiaRedux } from "../redux";
import { useDispatch } from "react-redux";
import { validateParameterKonversiCuti } from "../validate";
type FormProps = {
  isEdit: boolean;
};

const FormKonversiCuti = (
  props: InjectedFormProps<ParameterKonversiCutiInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterKonversiCutiaRedux();

  const simpan = async () => {
    dispatch(proses.prosesData());
  };

  useEffect(() => {
    setFocusField("bonus_jual");
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className={"col-6"}>
          <Field
            label="Total Rp"
            id="total_rp"
            name="total_rp"
            type="text"
            isRp
            placeholder="Masukan Total Rp"
            component={RenderNumber}
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

const mapState = (state: RootState<ParameterKonversiCutiInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        total_rp: state?.utility?.getModal?.data?.total_rp,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterKonversiCutiInterFace, FormProps> = {
  form: "FormKonversiCuti",
  enableReinitialize: true,
  validate: validateParameterKonversiCuti,
};

export default connector(
  reduxForm<ParameterKonversiCutiInterFace, FormProps>(config)(FormKonversiCuti)
);
