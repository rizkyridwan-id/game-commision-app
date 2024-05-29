import {
  FormFilterLaporanDto,
  JenisLaporanType,
  PelanggaranPegawaiInterFace,
} from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifSuccess, convertDate, getData, urlApi } from "@/utils";
import LaporanPelangganPegawaiPdfExcel from "../report";
export const reduxLaporanPelanggaranPegawai = () => {
  const exportLaporan = (type: JenisLaporanType): AppThunk => {
    return async (_dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.LaporanPelanggaran
        .values as FormFilterLaporanDto;

      //   console.log(formValues);

      const dataTmp = state.utility.getDataTmp
        ?.data as unknown as PelanggaranPegawaiInterFace[];

      LaporanPelangganPegawaiPdfExcel(dataTmp, formValues, type);
    };
  };

  const cariLaporan = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        const state = getState();
        const formValues = state.form.LaporanPelanggaran
          .values as FormFilterLaporanDto;

        dispatch(utilityActions.setLoading({ screen: true }));

        const newData = {
          start_date: convertDate(`${formValues.start_date}`),
          end_date: convertDate(`${formValues.end_date}`),
          kode_toko: formValues.kode_toko,
        };
        const response = await getData<PelanggaranPegawaiInterFace[]>(
          urlApi.report.pelanggaranPegawai,
          newData
        );
        if (response.data.length === 0) {
          dispatch(
            utilityActions.setLaporanKosong<PelanggaranPegawaiInterFace[]>(
              `Laporan Pelanggaran Pegawai Tidak Tersedia`
            )
          );
          return false;
        }
        const dataTmp: DataTmp<PelanggaranPegawaiInterFace[]> = {
          data: response.data,
          namaForm: `Laporan Pelanggaran Pegawai Tidak Tersedia`,
        };
        dispatch(simpanDataTmp(dataTmp));
        NotifSuccess(`Laporan Pelanggaran Pegawai Tersedia`);
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(
          utilityActions.setLaporanKosong<PelanggaranPegawaiInterFace[]>(
            `Laporan Pelanggaran Pegawai Tidak Tersedia`,
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
