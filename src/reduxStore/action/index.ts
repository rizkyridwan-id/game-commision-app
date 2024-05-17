import { Action } from "redux";
import { AppActionUtility, UtilityState } from "./utility";
import { AppActionTheme } from "./theme";
import { ThemeState } from "./theme";
import { FormStateMap } from "redux-form";

type RootAction = Action | AppActionTheme | AppActionUtility<string>;
export default RootAction;

export interface RootState<T> {
  utility: UtilityState<T>; // Add UtilityState property
  theme: ThemeState; // Existing property
  form: FormStateMap; // Existing property
}
export * from "./theme";
export * from "./utility";
