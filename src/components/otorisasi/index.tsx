import { AppDispatch } from "@/reduxStore";
import { ButtonCustom, ReanderField, setFocusField } from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  useEffect,
  useState,
} from "@/package";
import { ConfigProps } from "redux-form";

import { useDispatch } from "react-redux";
import { FormOtorisasiDto } from "./otorisasiDto";

type FormProps = {
  onPress: (value: FormOtorisasiDto) => void;
};
const FormOtorisasi = (
  props: InjectedFormProps<FormOtorisasiDto, FormProps, string> & FormProps
) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const { handleSubmit, onPress } = props;
  const dispatch = useDispatch<AppDispatch>();
  const simpan = async (data: FormOtorisasiDto) => {
    onPress(data);
  };

  useEffect(() => {
    setFocusField("user_id");
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <div className="row">
        <div className={"col-6"}>
          <Field
            label="User Id"
            id="user_id"
            name="user_id"
            type="text"
            noUpperCase
            placeholder="Masukan User Id"
            component={ReanderField}
          />
        </div>
        <div className={"col-6"}>
          <Field
            label="Password"
            id="password"
            name="password"
            type="text"
            noUpperCase
            placeholder="Masukan Password"
            component={ReanderField}
            right
            inputGroup
            textIconGroup={
              isShowPassword ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )
            }
            customeCss={isShowPassword ? "password-hide" : ""}
            handleClick={() => setIsShowPassword(!isShowPassword)}
          />
        </div>

        <div className={`col-12 text-end mt-4`}>
          <ButtonCustom color="primary" block type="submit" className="btn-lg">
            Otorisasi
          </ButtonCustom>
        </div>
      </div>
    </form>
  );
};

const config: ConfigProps<FormOtorisasiDto, FormProps> = {
  form: "FormOtorisasi",
  enableReinitialize: true,
};

export default reduxForm<FormOtorisasiDto, FormProps>(config)(FormOtorisasi);
