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
import { ParameterShiftKerjaInterFace } from "@/interface";

import { parameterShiftKerjaRedux } from "../redux";
import { useDispatch } from "react-redux";
import { validateParameterShiftKerja } from "../validate";
type FormProps = {
  isEdit: boolean;
};

const FormShiftKerja = (
  props: InjectedFormProps<ParameterShiftKerjaInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterShiftKerjaRedux();

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
            label="Type Shift"
            id="type_shift"
            name="type_shift"
            type="text"
            isRp
            placeholder="Masukan Type Shift"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Jam Masuk"
            id="start_time"
            name="start_time"
            type="time"
            placeholder="Masukan Jam Masuk"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Jam Maxsimal Masuk"
            id="due_time"
            name="due_time"
            type="time"
            placeholder="Masukan Jam Maxsimal Masuk"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Jam Pulang"
            id="work_end_time"
            name="work_end_time"
            type="time"
            placeholder="Masukan Jam Pulang"
            component={ReanderField}
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

const mapState = (state: RootState<ParameterShiftKerjaInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        type_shift: state?.utility?.getModal?.data?.type_shift,
        start_time: state?.utility?.getModal?.data?.start_time,
        due_time: state?.utility?.getModal?.data?.due_time,
        work_end_time: state?.utility?.getModal?.data?.work_end_time,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterShiftKerjaInterFace, FormProps> = {
  form: "FormShiftKerja",
  enableReinitialize: true,
  validate: validateParameterShiftKerja,
};

export default connector(
  reduxForm<ParameterShiftKerjaInterFace, FormProps>(config)(FormShiftKerja)
);
