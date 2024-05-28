import { Action } from "redux";
import { FormStateMap } from "redux-form";
import {
  AppActionTheme,
  AppActionUtility,
  DataHariLiburState,
  DataJabatanState,
  DataPegawaiState,
  DataTokoState,
  DataUserState,
  ParameterBonusSalesState,
  ParameterCutiState,
  ParameterKonversiCutiState,
  ParameterShiftKerjaState,
  ParameterTargetSalesState,
  ParameterTargetTokoState,
  PelanggaranPegawaiState,
  PengajuanCutiState,
  ReviewPengajuanCutiState,
  ThemeState,
  TimeKeepingState,
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
    dataToko: DataTokoState;
  };
  parameter: {
    dataBonusSales: ParameterBonusSalesState;
    parameterTargetSales: ParameterTargetSalesState;
    parameterTargetToko: ParameterTargetTokoState;
    parameterCuti: ParameterCutiState;
    parameterShiftKerja: ParameterShiftKerjaState;
    parameterKonversiCuti: ParameterKonversiCutiState;
  };

  timeKeeping: {
    dataTimeKeeping: TimeKeepingState;
  };

  transaksi: {
    dataPengajuanCuti: PengajuanCutiState;
    reviewPengajuanCuti: ReviewPengajuanCutiState;
    pelanggaranPegawaiReducer: PelanggaranPegawaiState;
  };
}
