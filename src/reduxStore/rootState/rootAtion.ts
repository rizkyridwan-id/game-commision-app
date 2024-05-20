import { Action } from "redux";
import { FormStateMap } from "redux-form";
import {
  AppActionTheme,
  AppActionUtility,
  DataUserState,
  ThemeState,
  UtilityState,
} from "../action";
type RootAction = Action | AppActionTheme | AppActionUtility<string>;
export default RootAction;

export interface RootState<T> {
  utility: UtilityState<T>; // Add UtilityState property
  theme: ThemeState; // Existing property
  form: FormStateMap;
  dataMaster: {
    dataUser: DataUserState;
  };
}
