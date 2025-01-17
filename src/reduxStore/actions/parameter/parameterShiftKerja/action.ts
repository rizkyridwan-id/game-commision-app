import { ParameterShiftKerjaInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterShiftKerjaAction, ParameterShiftKerjaType } from "./type";

export const getParameterShiftKerjaAction = (
  data: ParameterShiftKerjaInterFace[],
  total: number
): ParameterShiftKerjaAction => ({
  type: ParameterShiftKerjaType.GET_PARAMETER_SHIFT_KERJA,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterShiftKerja = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<ParameterShiftKerjaInterFace[]>(
        urlApi.paramter.parameterShiftKerja,
        params
      );
      dispatch(getParameterShiftKerjaAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterShiftKerjaAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
