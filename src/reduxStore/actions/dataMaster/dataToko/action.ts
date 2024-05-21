import { DataTokoInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { DataTokoAction, DataTokoType } from "./type";

export const getDataTokoAction = (
  data: DataTokoInterFace[],
  total: number
): DataTokoAction => ({
  type: DataTokoType.GET_DATA_TOKO,
  payload: {
    data: data,
    total: total,
  },
});

export const getDataToko = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<DataTokoInterFace[]>(
        urlApi.dataMaster.toko,
        params
      );
      dispatch(getDataTokoAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getDataTokoAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
