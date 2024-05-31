import {
  FormFilterLaporanDto,
  JenisLaporanType,
  ReportPayrollGlobalDtoProps,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanGlobalPayrollPdfExcel from "../report";
export const reduxLaporanGlobalPayroll = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanGlobalPayroll
        .values as FormFilterLaporanDto;

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as ReportPayrollGlobalDtoProps[];

      LaporanGlobalPayrollPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanGlobalPayroll
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_period: convertDate(`${formValues.start_period}`).slice(0, 7),
          end_period: convertDate(`${formValues.end_period}`).slice(0, 7),
        };
        const response = await getData<ReportPayrollGlobalDtoProps[]>(
          urlApi.report.globalPayroll,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<ReportPayrollGlobalDtoProps[]>(
              `Laporan Global Payroll Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<ReportPayrollGlobalDtoProps[]> = {
          data: response.data,
          namaForm: `Laporan Global Payroll Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Global Payroll Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<ReportPayrollGlobalDtoProps[]>(
            `Laporan Global Payroll Tidak Tersedia`,
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
