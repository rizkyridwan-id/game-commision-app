import { HariLiburInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { DataHariLiburAction, DataHariLiburType } from "./type";

export const getDataHariLiburAction = (
  users: HariLiburInterFace[],
  total: number
): DataHariLiburAction => ({
  type: DataHariLiburType.GET_DATA_HARI_LIBUR,
  payload: {
    data: users,
    total: total,
  },
});

export const getDataHariLibur = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<HariLiburInterFace[]>(
        urlApi.dataMaster.hariLibur,
        params
      );
      dispatch(getDataHariLiburAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getDataHariLiburAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
