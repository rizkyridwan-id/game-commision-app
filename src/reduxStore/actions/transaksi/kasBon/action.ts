import { KasBonInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, VITE_APP_KODE_TOKO, getData, today, urlApi } from "@/utils";
import { KasBonAction, KasBonType } from "./type";

export const getKasBonAction = (
  data: KasBonInterFace[],
  total: number
): KasBonAction => ({
  type: KasBonType.GET_DATA_KAS_BON,
  payload: {
    data: data,
    total: total,
  },
});

export const getDataKasBon = (row?: SearchInterface): AppThunk => {
  return async (dispatch: AppDispatch) => {
    try {
      const params: Record<string, string | number | undefined> = {
        skip: (Number(row?.skip || 1) - 1) * Number(row?.limit || 0),
        limit: row?.limit,
      };

      params.start_date = row?.start_date || today;
      params.end_date = row?.end_date || today;
      params.kode_toko = VITE_APP_KODE_TOKO;

      dispatch(utilityActions.setLoading({ table: true }));
      const response = await getData<KasBonInterFace[]>(
        urlApi.report.kasbon,
        params
      );
      dispatch(getKasBonAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getKasBonAction([], 0));
      dispatch(utilityActions.stopLoading());
      if (row?.namaForm === "Data Kasbon") {
        NotifInfo(`Data Kasbon Kosong`);
      } else {
        NotifInfo(`${error}`);
      }
    }
  };
};
