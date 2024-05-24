import { AppDispatch, RootState } from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  RenderNumber,
  RenderSelect,
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
import { ParameterTargetInterFace } from "@/interface";

import { parameterTargetTokoRedux } from "../redux";
import { useDispatch } from "react-redux";
import { validateParamaterTarget } from "../../targetSales";
type FormProps = {
  isEdit: boolean;
};

const FormTargetToko = (
  props: InjectedFormProps<ParameterTargetInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterTargetTokoRedux();

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
            label="Type Target"
            name="tipe_target"
            placeholder="Masukan Type Target"
            component={RenderSelect}
            options={[
              {
                value: "FAKTUR",
                label: "FAKTUR",
              },
              {
                value: "GRAM",
                label: "GRAM",
              },
              {
                value: "RUPIAH",
                label: "RUPIAH",
              },
            ]}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Target"
            id="target"
            name="target"
            type="text"
            isRp
            placeholder="Masukan Target"
            component={RenderNumber}
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

const mapState = (state: RootState<ParameterTargetInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        target: state?.utility?.getModal?.data?.target,
        tipe_target: state?.utility?.getModal?.data?.tipe_target,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterTargetInterFace, FormProps> = {
  form: "FormTargetToko",
  enableReinitialize: true,
  validate: validateParamaterTarget,
};

export default connector(
  reduxForm<ParameterTargetInterFace, FormProps>(config)(FormTargetToko)
);
