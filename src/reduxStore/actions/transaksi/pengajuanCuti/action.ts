import { PengajuanCutiInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, today, urlApi } from "@/utils";
import { PengajuanCutiAction, PengajuanCutiType } from "./type";

export const getPengajuanCutiAction = (
  data: PengajuanCutiInterFace[],
  total: number
): PengajuanCutiAction => ({
  type: PengajuanCutiType.GET_DATA_CUTI,
  payload: {
    data: data,
    total: total,
  },
});

export const getPengajuanCuti = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      params.start_date = row?.start_date || today;
      params.end_date = row?.end_date || today;

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<PengajuanCutiInterFace[]>(
        urlApi.report.cuti,
        params
      );
      dispatch(getPengajuanCutiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getPengajuanCutiAction([], 0));
      dispatch(utilityActions.stopLoading());
      if (row?.namaForm === "Data Pengajuan Cuti") {
        NotifInfo(`Data Pengajuan Cuti Kosong`);
      } else {
        NotifInfo(`${error}`);
      }
    }
  };
};
