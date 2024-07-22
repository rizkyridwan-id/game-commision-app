import { LemburInterFace, PegawaiInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";
import {
  calculateTotalMinutes,
  getData,
  NotifInfo,
  NotifSuccess,
  postData,
  timeout,
  urlApi,
} from "@/utils";
import { change, reset } from "redux-form";
import { cetakSlipLembur } from "../pdf/formLembur";

export const LemburService = () => {
  const cariParameterLembur = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      timeout(300);
      const state = getState();
      const FormValues = state.form.TransaksiLembur?.values as LemburInterFace;

      if (FormValues?.jam_awal && FormValues?.jam_akhir) {
        const toalLembur = calculateTotalMinutes(
          FormValues.jam_awal,
          FormValues.jam_akhir
        );

        dispatch(change("TransaksiLembur", "total_lembur", toalLembur));
      }
    };
  };
  const cariDataPegawai = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const FormValues = state.form.TransaksiLembur?.values as LemburInterFace;

      if (!FormValues.kode_toko) {
        NotifInfo("Kode Toko harus di pilih");
        return false;
      }

      try {
        const result = await getData<PegawaiInterface[]>(
          urlApi.dataMaster.pegawai,
          {
            kode_pegawai: FormValues.kode_pegawai,
          }
        );
        dispatch(
          change("TransaksiLembur", "nama_pegawai", result.data[0].nama_pegawai)
        );
        dispatch(change("TransaksiLembur", "jabatan", result.data[0].jabatan));
      } catch (error) {
        NotifInfo(`${error}`);
      }
    };
  };

  const saveLembur = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValues = state.form.TransaksiLembur?.values as LemburInterFace;

      //   console.log(formValues);
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData(urlApi.transaksi.lembur, {
          ...formValues,
          total_lembur: Number(formValues.total_lembur),
        });

        cetakSlipLembur(formValues);
        NotifSuccess("Lembur berhasil disimpan");
        dispatch(utilityActions.stopLoading());
        dispatch(reset("TransaksiLembur"));
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };

  return {
    cariDataPegawai,
    saveLembur,
    cariParameterLembur,
  };
};
