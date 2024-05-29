import { PotonganLainInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, VITE_APP_KODE_TOKO, getData, today, urlApi } from "@/utils";
import { PotonganLainAction, PotonganLainType } from "./type";

export const getPotonganLainAction = (
  data: PotonganLainInterFace[],
  total: number
): PotonganLainAction => ({
  type: PotonganLainType.GET_POTONGAN_LAIN,
  payload: {
    data: data,
    total: total,
  },
});

export const getPotonganLain = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<PotonganLainInterFace[]>(
        urlApi.report.potonganLain,
        params
      );
      dispatch(getPotonganLainAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getPotonganLainAction([], 0));
      dispatch(utilityActions.stopLoading());
      if (row?.namaForm === "Data Potongan") {
        NotifInfo(`Data Potongan Lain Kosong`);
      } else {
        NotifInfo(`${error}`);
      }
    }
  };
};
