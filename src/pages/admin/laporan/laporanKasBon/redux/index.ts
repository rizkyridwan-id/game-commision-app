import {
  FormFilterLaporanDto,
  JenisLaporanType,
  KasBonInterFace,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanKasBonCutiPdfExcel from "../report";
export const reduxLaporanKasBon = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanKasBon
        .values as FormFilterLaporanDto;

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as KasBonInterFace[];

      LaporanKasBonCutiPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanKasBon
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_date: convertDate(`${formValues.start_date}`),
          end_date: convertDate(`${formValues.end_date}`),
          kode_toko: formValues.kode_toko,
        };
        const response = await getData<KasBonInterFace[]>(
          urlApi.report.kasbon,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<KasBonInterFace[]>(
              `Laporan Kasbon Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<KasBonInterFace[]> = {
          data: response.data,
          namaForm: `Laporan Kasbon Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Kasbon Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<KasBonInterFace[]>(
            `Laporan Kasbon Tidak Tersedia`,
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
