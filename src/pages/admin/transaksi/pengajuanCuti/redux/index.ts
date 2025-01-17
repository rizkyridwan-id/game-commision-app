import { PengajuanCutiInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionTransaksi,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  VITE_APP_KODE_TOKO,
  deleteData,
  postData,
  putData,
  today,
  urlApi,
} from "@/utils";
import { reset } from "redux-form";

export const pengajuanCutiRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormPengajuanCuti
        ?.values as PengajuanCutiInterFace;

      formValue.tgl_system = today;
      formValue.kode_toko = `${VITE_APP_KODE_TOKO}`;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: PengajuanCutiInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<PengajuanCutiInterFace>(urlApi.transaksi.cuti, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionTransaksi.getPengajuanCuti());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPengajuanCuti"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: PengajuanCutiInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<PengajuanCutiInterFace>(
          `${urlApi.transaksi.cuti}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionTransaksi.getPengajuanCuti());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormPengajuanCuti"));
        dispatch(utilityActions.hideModal());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };

  const removeData = (id: string): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(
          utilityActions.setLoading({
            button: true,
          })
        );
        await deleteData<PengajuanCutiInterFace>(
          `${urlApi.transaksi.cuti}/${id}`
        );
        dispatch(actionTransaksi.getPengajuanCuti());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Hapus"}`);
      }
    };
  };

  const batalCuti = (data: PengajuanCutiInterFace): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(utilityActions.setLoading({ screen: true }));

      try {
        await postData(urlApi.transaksi.batalcuti, {
          kode_toko: data.kode_toko,
          kode_pegawai: data.kode_pegawai,
          tgl_cuti: data.tgl_system,
        });
        dispatch(utilityActions.stopLoading());
        NotifSuccess("Cuti Berhasil di batal");
        dispatch(actionTransaksi.getPengajuanCuti());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };

  return {
    prosesData,
    removeData,
    batalCuti,
  };
};
