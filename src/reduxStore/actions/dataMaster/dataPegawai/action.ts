import { PegawaiInterface, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import {
  NotifInfo,
  VITE_APP_KODE_TOKO,
  getData,
  isPusat,
  urlApi,
} from "@/utils";
import { DataPegawaiAction, DataPegawaiType } from "./type";

export const getDataPegawaiAction = (
  data: PegawaiInterface[],
  total: number
): DataPegawaiAction => ({
  type: DataPegawaiType.GET_DATA_PEGAWAI,
  payload: {
    data: data,
    total: total,
  },
});

export const getDataPegawai = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      if (!isPusat) {
        params.kode_toko = `${VITE_APP_KODE_TOKO}`;
      }

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<PegawaiInterface[]>(
        urlApi.dataMaster.pegawai,
        params
      );
      dispatch(getDataPegawaiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getDataPegawaiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
