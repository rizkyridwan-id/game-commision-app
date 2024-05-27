import { IReportTimeKeeping, JenisLaporanType } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanTimeKeepingPdfExcel from "../report";
import { LaporanTimeKeepingDto } from "../dto";

export const reduxLaporanTimeKeeping = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanTimeKeeping
        .values as LaporanTimeKeepingDto;
      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as IReportTimeKeeping[];

      LaporanTimeKeepingPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanTimeKeeping
          .values as LaporanTimeKeepingDto;
        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          tgl_system: convertDate(formValues.tgl_system),
          kode_toko: formValues.kode_toko,
          type_shift: formValues.type_shift,
          type_time_keeping: formValues.type_time_keeping,
        };
        const response = await getData<IReportTimeKeeping[]>(
          urlApi.report.timeKeeping,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<IReportTimeKeeping[]>(
              "Laporan Time Keeping Tidak Tersedia"
            )
          );
          return false;
        }
        const dataTmp: DataTmp<IReportTimeKeeping[]> = {
          data: response.data,
          namaForm: "Laporan Time Keeping Tidak Tersedia",
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess("Laporan Tersedia");
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<IReportTimeKeeping[]>(
            "Laporan Time Keeping Tidak Tersedia",
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
