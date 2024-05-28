import { PengajuanCutiInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, getData, today, urlApi } from "@/utils";
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

      params.start_date = row?.start_date || today;
      params.end_date = row?.end_date || today;

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<PengajuanCutiInterFace[]>(
        urlApi.dashboard.cuti,
        params
      );
      dispatch(getReviewPengajuanCutiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getReviewPengajuanCutiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
