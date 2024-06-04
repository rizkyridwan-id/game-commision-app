import {
  FormFilterLaporanDto,
  JenisLaporanType,
  PengajuanCutiInterFace,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanPengajuanCutiPdfExcel from "../report";
export const reduxLaporanPengajuanCuti = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanPengajuanCuti
        .values as PengajuanCutiInterFace;

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as PengajuanCutiInterFace[];

      LaporanPengajuanCutiPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanPengajuanCuti
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_date: convertDate(`${formValues.start_date}`),
          end_date: convertDate(`${formValues.end_date}`),
          kode_toko: formValues.kode_toko,
        };
        const response = await getData<PengajuanCutiInterFace[]>(
          urlApi.report.cuti,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<PengajuanCutiInterFace[]>(
              `Laporan Pengajuan Cuti Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<PengajuanCutiInterFace[]> = {
          data: response.data,
          namaForm: `Laporan Pengajuan Cuti Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Pengajuan Cuti Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(simpanDataTmp({ data: [] }));

        dispatch(
          utilityActions.setLaporanKosong<PengajuanCutiInterFace[]>(
            `Laporan Pengajuan Cuti Tidak Tersedia`,
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
