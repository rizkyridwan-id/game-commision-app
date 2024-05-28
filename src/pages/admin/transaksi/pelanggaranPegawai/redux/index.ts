import { PelanggaranPegawaiInterFace } from "@/interface";
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
  urlApi,
} from "@/utils";
import { reset } from "redux-form";

export const reduxPelanggaranPegawai = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormPelanggaranPegawai
        ?.values as PelanggaranPegawaiInterFace;

      formValue.kode_toko = `${VITE_APP_KODE_TOKO}`;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: PelanggaranPegawaiInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<PelanggaranPegawaiInterFace>(
          urlApi.transaksi.pelanggaranPegawai,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(utilityActions.stopLoading());
        dispatch(actionTransaksi.getPelanggaranPegawai());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPelanggaranPegawai"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: PelanggaranPegawaiInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<PelanggaranPegawaiInterFace>(
          `${urlApi.transaksi.pelanggaranPegawai}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(utilityActions.stopLoading());
        dispatch(actionTransaksi.getPelanggaranPegawai());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPelanggaranPegawai"));
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
        await deleteData<PelanggaranPegawaiInterFace>(
          `${urlApi.transaksi.pelanggaranPegawai}/${id}`
        );
        dispatch(actionTransaksi.getPelanggaranPegawai());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormPelanggaranPegawai"));
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Hapus"}`);
      }
    };
  };

  return {
    prosesData,
    removeData,
  };
};
