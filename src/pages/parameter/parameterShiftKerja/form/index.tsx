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
            label="Dari Jam Datang"
            id="dari_jam_datang"
            name="dari_jam_datang"
            type="time"
            placeholder="Masukan Dari Jam Datang"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Sampai Jam Datang"
            id="sampai_jam_datang"
            name="sampai_jam_datang"
            type="time"
            placeholder="Masukan Sampai Jam Datang"
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

const mapState = (state: RootState<ParameterShiftKerjaInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        dari_jam_datang: state?.utility?.getModal?.data?.dari_jam_datang,
        sampai_jam_datang: state?.utility?.getModal?.data?.sampai_jam_datang,
        jam_pulang: state?.utility?.getModal?.data?.jam_pulang,
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
