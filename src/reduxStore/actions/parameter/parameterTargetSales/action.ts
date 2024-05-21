import { ParameterTargetInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterTargetSalesAction, ParameterTargetSalesType } from "./type";

export const getParameterTargetSalesAction = (
  users: ParameterTargetInterFace[],
  total: number
): ParameterTargetSalesAction => ({
  type: ParameterTargetSalesType.GET_PARAMETER_TARGET_SALES,
  payload: {
    data: users,
    total: total,
  },
});

export const getParameterTargetSales = (row?: SearchInterface): AppThunk => {
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
      dispatch(getParameterTargetSalesAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterTargetSalesAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
