import { HelperActionTypes, IsLoginAction } from "./type";

const isLogin = (data: boolean): IsLoginAction => ({
  type: HelperActionTypes.IS_LOGIN,
  payload: data,
});

const helperActions = {
  isLogin,
};
export default helperActions;
