import {
  useEffect,
  Field,
  useDispatch,
  reduxForm,
  InjectedFormProps,
} from "../../../package";
import { validateLogin } from "./validate";
import bgLogin from "../../../assets/images/white-concrete-wall.webp";
import {
  AppDispatch,
  themesActions,
  useAppSelector,
  utilityActions,
} from "@/reduxStore";
import { ButtonCustom, ReanderField } from "@/utils";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DataUserInterFace } from "@/interface";
import { reduxLogin } from "./reduxLogin";
import { metaData } from "@/config";

const LoginForm = (props: InjectedFormProps<DataUserInterFace>) => {
  const dispatch = useDispatch<AppDispatch>();
  const helpers = useAppSelector((state) => state.helper);
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

  const prosesLogin = async () => {
    dispatch(utilityActions.setLoading({ screen: true }));
    dispatch(reduxLogin());
  };
  if (helpers.getIsLogin) {
    return <Navigate to="/app/dashboard" />;
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
              <span className="logo"></span> <b>Login Us </b>
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
              © All Right Reserved Time Keeping Management Solution <br />
              Version {metaData.buildVersion.major}.
              {metaData.buildVersion.minor}.{metaData.buildVersion.patch}.
              {metaData.buildVersion.revision}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm<DataUserInterFace>({
  form: "loginForm",
  validate: validateLogin,
})(LoginForm);
