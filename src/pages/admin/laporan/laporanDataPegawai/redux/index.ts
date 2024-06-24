import { JenisLaporanType, PegawaiInterface } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  DataTmp,
  simpanDataTmp,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, getData, urlApi } from "@/utils";
import { LaporanDataPegawaiDto } from "../dto";
import LaporanDataPegawaiPdfExcel from "../report";

export const reduxLaporanPegawai = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    const formValues = getState().form.LaporanDataPegawai
      ?.values as LaporanDataPegawaiDto;
    // console.log(formValues);
    try {
      const result = await getData<PegawaiInterface[]>(
        urlApi.dataMaster.pegawai
      );
      const hasil =
        formValues?.kode_toko === "SEMUA"
          ? result.data
          : result.data.filter(
              (list) => list.kode_toko === formValues?.kode_toko
            );

      //   console.log(hasil);
      const dataTmp: DataTmp<PegawaiInterface[]> = {
        data: hasil,
        namaForm: `Laporan Data Pegawai Tersedia`,
      };
      dispatch(simpanDataTmp(dataTmp));
      NotifSuccess(`Laporan Data Pegawai Tersedia`);
    } catch (error) {
      NotifInfo(`${error}`);
      dispatch(
        utilityActions.setLaporanKosong<PegawaiInterface[]>(
          `Laporan Data Pegawai Tidak Tersedia`,
          `${error}`
        )
      );
    }
  };
};

export const exportLaporan = (type: JenisLaporanType): AppThunk => {
  return async (_dispatch: AppDispatch, getState) => {
    const state = getState();
    const formValues = getState().form.LaporanDataPegawai
      ?.values as LaporanDataPegawaiDto;

    const dataTmp = state.utility.getDataTmp
      ?.data as unknown as PegawaiInterface[];

    LaporanDataPegawaiPdfExcel(dataTmp, formValues, type);
  };
};
