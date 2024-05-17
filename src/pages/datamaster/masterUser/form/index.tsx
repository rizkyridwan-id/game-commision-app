import { MasterUserInterface } from "@/interface";
import { AppDispatch, RootState } from "@/reduxStore";

import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  setFocusField,
} from "@/utils";
import { connect, useDispatch } from "react-redux";
import { ConfigProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import { reduxMasterUser } from "../redux";
import { useEffect } from "react";

type FormProps = {
  isEdit: boolean;
};

const FormMasterUser = (
  props: InjectedFormProps<MasterUserInterface, FormProps, string> & FormProps
) => {
  const { handleSubmit, pristine, submitting, isEdit } = props;
  const dispatch = useDispatch<AppDispatch>();
  const proses = reduxMasterUser();

  const simpan = async (data: MasterUserInterface) => {
    dispatch(proses.prosesData(data));
  };

  useEffect(() => {
    setFocusField("username");
  }, []);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="id" type="hidden" component={HiddenField} />
      <div className="row">
        <div className="col-6">
          <div className="mb-20px">
            <Field
              label="Username"
              id="username"
              name="username"
              type="text"
              placeholder="Masukan Username"
              component={ReanderField}
            />
          </div>
        </div>
        <div className="col-6 mt-6">
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

const mapState = (state: RootState<MasterUserInterface>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        username: state?.utility?.getModal?.data?.username,
      },
    };
  } else {
    return {
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<MasterUserInterface, FormProps> = {
  form: "FormMasterUser",
  enableReinitialize: true,
};

export default connector(
  reduxForm<MasterUserInterface, FormProps>(config)(FormMasterUser)
);
