import { Action } from "redux";

export const HelperActionTypes = {
  IS_LOGIN: "IS_LOGIN",
} as const;

export interface IsLoginAction
  extends Action<typeof HelperActionTypes.IS_LOGIN> {
  payload: boolean;
}
export interface helperState {
  getIsLogin: boolean;
}

export type helperAction = IsLoginAction;
