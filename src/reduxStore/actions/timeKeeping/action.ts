import { TimeKeepingKehadiranInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../index";
import { NotifInfo, VITE_APP_KODE_TOKO, getData, urlApi } from "@/utils";
import { TimeKeepingAction, TimeKeepingType } from "./type";

export const getDataTimeKeepingAction = (
  data: TimeKeepingKehadiranInterFace[],
  total: number
): TimeKeepingAction => ({
  type: TimeKeepingType.GET_DATA_TIME_KEEPING,
  payload: {
    data: data,
    total: total,
  },
});

export const getDataTimeKeeping = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      if (row?.tgl_system !== undefined) {
        params.tgl_system = row.tgl_system || "";
      }
      params.kode_toko = VITE_APP_KODE_TOKO;

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<TimeKeepingKehadiranInterFace[]>(
        urlApi.timeKeeping.dataTimeKeeping,
        params
      );
      dispatch(getDataTimeKeepingAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getDataTimeKeepingAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
