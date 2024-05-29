import { KasBonInterFace } from "@/interface";
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

export const reduxKasBon = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormKasBon?.values as KasBonInterFace;

      formValue.kode_toko = `${VITE_APP_KODE_TOKO}`;
      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: KasBonInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<KasBonInterFace>(urlApi.transaksi.kasbon, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionTransaksi.getDataKasBon());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormKasBon"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: KasBonInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<KasBonInterFace>(
          `${urlApi.transaksi.kasbon}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionTransaksi.getDataKasBon());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormKasBon"));
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
        await deleteData<KasBonInterFace>(`${urlApi.transaksi.kasbon}/${id}`);
        dispatch(actionTransaksi.getDataKasBon());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
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
