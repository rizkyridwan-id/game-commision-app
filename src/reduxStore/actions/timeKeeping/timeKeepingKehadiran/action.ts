import { TimeKeepingKehadiranInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { TimeKeepingKehadiranAction, TimeKeepingKehadiranType } from "./type";

export const getTimeKeepingKehadiranAction = (
  data: TimeKeepingKehadiranInterFace[],
  total: number
): TimeKeepingKehadiranAction => ({
  type: TimeKeepingKehadiranType.GET_TIME_KEEPING_KEHADIRAN,
  payload: {
    data: data,
    total: total,
  },
});

export const getTimeKeepingKehadiran = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      if (row?.q !== undefined) {
        params.q = row.q || "";
      }

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<TimeKeepingKehadiranInterFace[]>(
        urlApi.paramter.bonusSales,
        params
      );
      dispatch(getTimeKeepingKehadiranAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getTimeKeepingKehadiranAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
