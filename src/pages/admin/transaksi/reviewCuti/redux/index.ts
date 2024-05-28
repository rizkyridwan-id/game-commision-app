import {
  AppDispatch,
  AppThunk,
  actionTransaksi,
  utilityActions,
} from "@/reduxStore";
import { ReviewCutiDto } from "../dto";
import { NotifInfo, NotifSuccess, putData, urlApi } from "@/utils";

export const reduxReviewCuti = () => {
  const validasiCuti = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormReviewCuti?.values as ReviewCutiDto;

      try {
        dispatch(
          utilityActions.setLoading({
            screen: true,
          })
        );
        await putData(`${urlApi.transaksi.cuti}/${formValue._id}/review`, {
          status_validasi: formValue.status_validasi,
          reject_description: formValue.reject_description || "-",
        });
        NotifSuccess("Data Cuti Berhasil Disimpan");
        dispatch(utilityActions.hideModal());
        dispatch(utilityActions.stopLoading());
        dispatch(actionTransaksi.getReviewPengajuanCuti());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error}`);
      }
    };
  };
  return {
    validasiCuti,
  };
};
