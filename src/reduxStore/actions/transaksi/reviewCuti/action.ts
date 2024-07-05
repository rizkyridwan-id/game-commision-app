import { PengajuanCutiInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, convertDate, getData, today, urlApi } from "@/utils";
import { ReviewPengajuanCutiAction, ReviewPengajuanCutiType } from "./type";

export const getReviewPengajuanCutiAction = (
  data: PengajuanCutiInterFace[],
  total: number
): ReviewPengajuanCutiAction => ({
  type: ReviewPengajuanCutiType.GET_REVIEW_DATA_CUTI,
  payload: {
    data: data,
    total: total,
  },
});

export const getReviewPengajuanCuti = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      params.start_date = convertDate(row?.start_date || today);
      params.end_date = convertDate(row?.end_date || today);
      params.status_validasi = row?.status_validasi;
      params.kode_toko = row?.kode_toko;

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<PengajuanCutiInterFace[]>(
        urlApi.dashboard.cuti,
        params
      );
      if (response.data.length === 0) {
        NotifInfo("Data Review Cuti Tidak Tersedia");
      }
      dispatch(getReviewPengajuanCutiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getReviewPengajuanCutiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
