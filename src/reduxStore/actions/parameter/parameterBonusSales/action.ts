import { ParameterBonusSalesInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterBonusSalesAction, ParameterBonusSalesType } from "./type";

export const getParameterBonusSalesAction = (
  data: ParameterBonusSalesInterFace[],
  total: number
): ParameterBonusSalesAction => ({
  type: ParameterBonusSalesType.GET_PARAMETER_BONUS,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterBonusSales = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<ParameterBonusSalesInterFace[]>(
        urlApi.paramter.bonusSales,
        params
      );
      dispatch(getParameterBonusSalesAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterBonusSalesAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
