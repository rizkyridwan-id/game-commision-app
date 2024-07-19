import { ParameterLemburInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterLemburAction, ParameterLemburType } from "./type";

export const getParameterLemburAction = (
  data: ParameterLemburInterFace[],
  total: number
): ParameterLemburAction => ({
  type: ParameterLemburType.GET_PARAMETER_LEMBUR,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterLembur = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<ParameterLemburInterFace[]>(
        urlApi.paramter.parameterLembur,
        params
      );
      dispatch(getParameterLemburAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterLemburAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
