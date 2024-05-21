import { Action } from "redux";
import { FormStateMap } from "redux-form";
import {
  AppActionTheme,
  AppActionUtility,
  DataHariLiburState,
  DataJabatanState,
  DataPegawaiState,
  DataUserState,
  ParameterBonusSalesState,
  ThemeState,
  UtilityState,
  helperState,
} from "../actions";
type RootAction = Action | AppActionTheme | AppActionUtility<string>;
export default RootAction;

export interface RootState<T> {
  utility: UtilityState<T>; // Add UtilityState property
  theme: ThemeState; // Existing property
  form: FormStateMap;
  helper: helperState;
  dataMaster: {
    dataUser: DataUserState;
    dataJabatan: DataJabatanState;
    dataHariLibur: DataHariLiburState;
    dataPegawai: DataPegawaiState;
  };
  parameter: {
    dataBonusSales: ParameterBonusSalesState;
  };
}
