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
import { ParameterBonusSalesInterFace } from "@/interface";
import { validateParameterBonusSales } from "../validate";

import { parameterBonusRedux } from "../redux";
import { useDispatch } from "react-redux";
type FormProps = {
  isEdit: boolean;
};

const FormParameterBonus = (
  props: InjectedFormProps<ParameterBonusSalesInterFace, FormProps, string> &
    FormProps
) => {
  const { handleSubmit, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = parameterBonusRedux();

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
            label="Bonus Jual"
            id="bonus_jual"
            name="bonus_jual"
            type="text"
            isRp
            placeholder="Masukan Bonus Jual"
            component={RenderNumber}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Bonus Beli"
            name="bonus_beli"
            type="text"
            isRp
            placeholder="Masukan Bonus Beli"
            component={RenderNumber}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Bonus Hutang"
            name="bonus_hutang"
            type="text"
            isRp
            placeholder="Masukan Bonus Hutang"
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

const mapState = (state: RootState<ParameterBonusSalesInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        bonus_jual: state?.utility?.getModal?.data?.bonus_jual,
        bonus_beli: state?.utility?.getModal?.data?.bonus_beli,
        bonus_hutang: state?.utility?.getModal?.data?.bonus_hutang,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<ParameterBonusSalesInterFace, FormProps> = {
  form: "FormParameterBonus",
  enableReinitialize: true,
  validate: validateParameterBonusSales,
};

export default connector(
  reduxForm<ParameterBonusSalesInterFace, FormProps>(config)(FormParameterBonus)
);
