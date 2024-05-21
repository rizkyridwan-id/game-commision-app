import {
  legacy_createStore as createStore,
  combineReducers,
  Action,
} from "redux";
import { reducer as formReducer } from "redux-form";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import RootAction, { RootState } from "./rootAtion";
import {
  dataHariLiburReducer,
  dataJabatanReducer,
  dataPegawaiReducer,
  dataUserReducer,
  parameterBonusSalesReducer,
  parameterTargetSalesReducer,
  reducerHelper,
  themeReducer,
  utilityReducer,
} from "../reducers";
import parameterTargetTokoReducer from "../reducers/reducers/parameter/parameterTargetToko";

export const rootReducer = combineReducers({
  form: formReducer,
  utility: utilityReducer,
  helper: reducerHelper,
  theme: themeReducer,
  dataMaster: combineReducers({
    dataJabatan: dataJabatanReducer,
    dataUser: dataUserReducer,
    dataHariLibur: dataHariLiburReducer,
    dataPegawai: dataPegawaiReducer,
  }),
  parameter: combineReducers({
    dataBonusSales: parameterBonusSalesReducer,
    parameterTargetSales: parameterTargetSalesReducer,
    parameterTargetToko: parameterTargetTokoReducer,
  }),
});
const store = createStore(rootReducer);

export type AppDispatch = ThunkDispatch<RootState<string>, unknown, RootAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState<string>,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
