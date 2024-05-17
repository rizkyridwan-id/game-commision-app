import {
  useEffect,
  Field,
  useDispatch,
  reduxForm,
  InjectedFormProps,
} from "../../package";
import { validateLogin } from "./validate";
import bgLogin from "../../assets/images/white-concrete-wall.webp";
import {
  AppDispatch,
  themesActions,
  useAppSelector,
  utilityActions,
} from "@/reduxStore";
import { ButtonCustom, ReanderField, setItem } from "@/utils";
import { useState } from "react";
import { FormLoginDto } from "./dto/formLoginDto";
import { Navigate } from "react-router-dom";

const LoginForm = (props: InjectedFormProps<FormLoginDto>) => {
  const dispatch = useDispatch<AppDispatch>();
  const utility = useAppSelector((state) => state.utility);
  const [isShowPassword, setIsShowPassword] = useState(true);

  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
    };
  }, [dispatch]);
  const { handleSubmit } = props;

  const prosesLogin = (dataForm: FormLoginDto) => {
    dispatch(utilityActions.setLoading({ screen: true }));
    setItem("userdata", {
      token: 1231,
      username: dataForm.user_id,
    });
    setTimeout(() => {
      dispatch(utilityActions.isLogin(true));
      dispatch(utilityActions.stopLoading());
    }, 300);
  };
  if (utility.getIsLogin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="login login-v2 fw-bold">
      <div className="login-cover">
        <div
          className="login-cover-img"
          style={{ backgroundImage: "url(" + bgLogin + ")" }}
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="brand">
            <div className="d-flex align-items-center">
              <span className="logo"></span> <b>Color</b> Admin Base
            </div>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>

        <div className="login-content">
          <form onSubmit={handleSubmit(prosesLogin)}>
            <div className="mb-20px">
              <Field
                label="User Id"
                name="user_id"
                type="text"
                noUpperCase
                placeholder="Masukan User Id"
                component={ReanderField}
              />
            </div>
            <div className="mb-20px">
              <Field
                type={"text"}
                label="Passsword"
                name="password"
                enableenter
                noUpperCase
                id="password"
                nouperCase
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
            <div className="mb-20px">
              <ButtonCustom
                disabled={props.pristine || props.submitting}
                color="primary"
                block
                type="submit"
                className="btn-lg"
              >
                Login
              </ButtonCustom>
            </div>
            <div className="text-center">
              © All Right Reserved Color Admin Base <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm<FormLoginDto>({
  form: "loginForm",
  validate: validateLogin,
})(LoginForm);
