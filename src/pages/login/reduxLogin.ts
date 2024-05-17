import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";
import { FormLoginDto } from "./dto/formLoginDto";
import { setItem } from "@/utils";

export const reduxLogin = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const state = getState();
    const dataForm = state.form.loginForm.values as FormLoginDto;
    dispatch(utilityActions.setLoading({ screen: true }));
    setTimeout(() => {
      setItem("userdata", {
        token: 1231,
        username: dataForm.user_id,
      });
      window.location.reload();
      dispatch(utilityActions.stopLoading());
    }, 1000);
  };
};
