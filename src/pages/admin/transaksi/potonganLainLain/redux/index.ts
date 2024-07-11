import { PotonganLainInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionTransaksi,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  NotificationSwal,
  VITE_APP_KODE_TOKO,
  deleteData,
  postData,
  urlApi,
} from "@/utils";
import { reset } from "redux-form";

export const potonganLainRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormPotonganLain
        ?.values as PotonganLainInterFace;

      formValue.kode_toko = `${VITE_APP_KODE_TOKO}`;

      dispatch(save(formValue));
    };
  };

  const save = (data: PotonganLainInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<PotonganLainInterFace>(
          urlApi.transaksi.potonganLain,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionTransaksi.getPotonganLain());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPotonganLain"));
      } catch (error) {
        // NotifInfo(`${error}`);
        NotificationSwal({
          icon: "info",
          html: `${error}`,
          title: "Informasi",
        });
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
        await deleteData<PotonganLainInterFace>(
          `${urlApi.transaksi.potonganLain}/${id}`
        );
        dispatch(actionTransaksi.getPotonganLain());
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
