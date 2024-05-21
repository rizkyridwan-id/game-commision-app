import { ParameterKonversiCutiInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, urlApi } from "@/utils";
import { ParameterKonversiCutiAction, ParameterKonversiCutiType } from "./type";

export const getParameterKonversiCutiAction = (
  data: ParameterKonversiCutiInterFace[],
  total: number
): ParameterKonversiCutiAction => ({
  type: ParameterKonversiCutiType.GET_PARAMETER_KONVERSI_CUTI,
  payload: {
    data: data,
    total: total,
  },
});

export const getParameterKonversiCuti = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<ParameterKonversiCutiInterFace[]>(
        urlApi.paramter.bonusSales,
        params
      );
      dispatch(getParameterKonversiCutiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getParameterKonversiCutiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
