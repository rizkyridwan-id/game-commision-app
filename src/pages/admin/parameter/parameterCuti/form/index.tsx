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
import { ParameterCutiInterFace } from "@/interface";

import { parameterCutiRedux } from "../redux";
import { useDispatch } from "react-redux";
import { validateParameterCuti } from "../validate";
type FormProps = {
  isEdit: boolean;
};

const FormPengajuanCuti = (
  props: InjectedFormProps<ParameterCutiInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterCutiRedux();

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
        <div className={"col-6"}>
          <Field
            label="Jangka Waktu Pengajuan Cuti"
            id="leave_request_gap_days"
            name="leave_request_gap_days"
            type="text"
            placeholder="Masukan Jangka Waktu Pengajuan Cuti"
            component={RenderNumber}
          />
        </div>

        <div className={`col-6 text-end mt-4`}>
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            {isEdit ? "Edit" : "Simpan "}
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<ParameterCutiInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        leave_request_gap_days:
          state?.utility?.getModal?.data?.leave_request_gap_days,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterCutiInterFace, FormProps> = {
  form: "FormCuti",
  enableReinitialize: true,
  validate: validateParameterCuti,
};

export default connector(
  reduxForm<ParameterCutiInterFace, FormProps>(config)(FormPengajuanCuti)
);
