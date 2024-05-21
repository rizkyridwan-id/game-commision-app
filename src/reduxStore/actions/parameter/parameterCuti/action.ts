import { ParameterTargetInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterCutiAction, ParameterCutiType } from "./type";

export const getParameterCutiAction = (
  data: ParameterTargetInterFace[],
  total: number
): ParameterCutiAction => ({
  type: ParameterCutiType.GET_PARAMETER_CUTI,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterCuti = (row?: SearchInterface): AppThunk => {
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
        urlApi.paramter.parameterCuti,
        params
      );
      dispatch(getParameterCutiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterCutiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
