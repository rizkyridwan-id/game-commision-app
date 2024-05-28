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
  dataTokoReducer,
  dataUserReducer,
  parameterBonusSalesReducer,
  parameterCutiReducer,
  parameterShiftKerjaReducer,
  parameterTargetSalesReducer,
  reducerHelper,
  themeReducer,
  utilityReducer,
  parameterTargetTokoReducer,
  parameterKonversiCutiReducer,
  timeKeepingReducer,
  pengajuanCutiReducer,
  reviewPengajuanCutiReducer,
  pelanggaranPegawaiReducer,
} from "../reducers";

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
    dataToko: dataTokoReducer,
  }),
  parameter: combineReducers({
    dataBonusSales: parameterBonusSalesReducer,
    parameterTargetSales: parameterTargetSalesReducer,
    parameterTargetToko: parameterTargetTokoReducer,
    parameterCuti: parameterCutiReducer,
    parameterShiftKerja: parameterShiftKerjaReducer,
    parameterKonversiCuti: parameterKonversiCutiReducer,
  }),

  timeKeeping: combineReducers({
    dataTimeKeeping: timeKeepingReducer,
  }),

  transaksi: combineReducers({
    dataPengajuanCuti: pengajuanCutiReducer,
    reviewPengajuanCuti: reviewPengajuanCutiReducer,
    pelanggaranPegawaiReducer: pelanggaranPegawaiReducer,
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
