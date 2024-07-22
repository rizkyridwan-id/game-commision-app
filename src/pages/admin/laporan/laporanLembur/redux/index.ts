import { JenisLaporanType, LemburInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { getData, NotifInfo, NotifSuccess, urlApi } from "@/utils";
import { LaporanLemburDto } from "../dto";
import LaporanLemburPdfExcel from "../report";

export const reportLemburService = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanTransaksiLembur
        .values as LaporanLemburDto;

      //   console.log(formValues);

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as LemburInterFace[];

      console.log(formValues);

      LaporanLemburPdfExcel(dataTmp, formValues, type);
    };
  };
  const getReportLembur = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const form = state.form.LaporanTransaksiLembur?.values;

      //   console.log(form);
      try {
        const response = await getData<LemburInterFace[]>(
          urlApi.report.getReportLembur,
          form
        );

        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<LemburInterFace[]>(
              `Laporan Lembur Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<LemburInterFace[]> = {
          data: response.data,
          namaForm: `Laporan Lembur Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Lembur Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };

  return {
    getReportLembur,
    exportLaporan,
  };
};
