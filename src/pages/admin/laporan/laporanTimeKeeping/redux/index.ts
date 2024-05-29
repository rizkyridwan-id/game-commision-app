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

  const cariLaporan = (type: string): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const typeAkses = type === "DASHBOARD" ? true : false;

      try {
        const state = getState();
        const formValues = (
          typeAkses
            ? state.form.dashboardTimeKeeping?.values
            : state.form.LaporanTimeKeeping.values
        ) as LaporanTimeKeepingDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          tgl_system: convertDate(formValues.tgl_system),
          kode_toko: formValues.kode_toko,
          type_shift:
            formValues.type_shift === "SEMUA"
              ? undefined
              : formValues.type_shift,
        };
        const response = await getData<IReportTimeKeeping[]>(
          urlApi.report.timeKeeping,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<IReportTimeKeeping[]>(
              "LaporanTimeKeeping",
              `${typeAkses ? "Data" : "Laporan"} Time Keeping Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<IReportTimeKeeping[]> = {
          data: response.data,
          namaForm: `${typeAkses ? "Data" : "Laporan"} Time Keeping Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`${typeAkses ? "Data" : "Laporan"} Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<IReportTimeKeeping[]>(
            `${typeAkses ? "Data" : "Laporan"} Time Keeping Tidak Tersedia`,
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
