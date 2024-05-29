import { PelanggaranPegawaiInterFace, SearchInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "../../../index";
import { NotifInfo, VITE_APP_KODE_TOKO, getData, today, urlApi } from "@/utils";
import { PelanggaranPegawaiAction, PelanggaranPegawaiType } from "./type";

export const getPelanggaranPegawaiAction = (
  data: PelanggaranPegawaiInterFace[],
  total: number
): PelanggaranPegawaiAction => ({
  type: PelanggaranPegawaiType.GET_DATA_PELANGGARAN_PEGAWAI,
  payload: {
    data: data,
    total: total,
  },
});

export const getPelanggaranPegawai = (row?: SearchInterface): AppThunk => {
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
      const response = await getData<PelanggaranPegawaiInterFace[]>(
        urlApi.report.pelanggaranPegawai,
        params
      );
      dispatch(getPelanggaranPegawaiAction(response.data, response.count));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      dispatch(getPelanggaranPegawaiAction([], 0));
      dispatch(utilityActions.stopLoading());
      NotifInfo(`${error}`);
    }
  };
};
