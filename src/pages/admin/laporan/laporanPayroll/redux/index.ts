import {
  FormFilterLaporanDto,
  JenisLaporanType,
  PayrollInterFace,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanPPayrollPdfExcel from "../report";
export const reduxLaporanPayroll = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanPayroll
        .values as FormFilterLaporanDto;

      //   console.log(formValues);

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as PayrollInterFace[];

      LaporanPPayrollPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanPayroll
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_period: convertDate(`${formValues.start_period}`).slice(0, 7),
          end_period: convertDate(`${formValues.end_period}`).slice(0, 7),
          kode_toko: formValues.kode_toko,
        };
        const response = await getData<PayrollInterFace[]>(
          urlApi.report.payroll,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<PayrollInterFace[]>(
              `Laporan Payroll Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<PayrollInterFace[]> = {
          data: response.data,
          namaForm: `Laporan Payroll Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Payroll Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<PayrollInterFace[]>(
            `Laporan Payroll Tidak Tersedia`,
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
