import { ParameterTargetInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterTargetTokoAction, ParameterTargetTokoType } from "./type";

export const getParameterTargetTokoAction = (
  data: ParameterTargetInterFace[],
  total: number
): ParameterTargetTokoAction => ({
  type: ParameterTargetTokoType.GET_PARAMETER_TARGET_TOKO,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterTargetToko = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<ParameterTargetInterFace[]>(
        urlApi.paramter.bonusSales,
        params
      );
      dispatch(getParameterTargetTokoAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterTargetTokoAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
