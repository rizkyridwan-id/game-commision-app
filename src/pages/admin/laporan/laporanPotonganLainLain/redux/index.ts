import {
  FormFilterLaporanDto,
  JenisLaporanType,
  PotonganLainInterFace,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanPotonganLainLainPdfExcel from "../report";
export const reduxLaporanPotonganLainLain = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanPotonganLainLain
        .values as PotonganLainInterFace;

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as PotonganLainInterFace[];

      LaporanPotonganLainLainPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanPotonganLainLain
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_date: convertDate(`${formValues.start_date}`),
          end_date: convertDate(`${formValues.end_date}`),
          kode_toko: formValues.kode_toko,
        };
        const response = await getData<PotonganLainInterFace[]>(
          urlApi.report.potonganLain,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<PotonganLainInterFace[]>(
              `Laporan PotonganLain Cuti Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<PotonganLainInterFace[]> = {
          data: response.data,
          namaForm: `Laporan PotonganLain Cuti Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan PotonganLain Cuti Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<PotonganLainInterFace[]>(
            `Laporan PotonganLain Cuti Tidak Tersedia`,
            `${error}`
          )
        );
      }
    };
  };

  return {
    exportLaporan,
    cariLaporan,
  };
};
