import { ParameterShiftKerjaInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, deleteData, postData, urlApi } from "@/utils";

export const parameterKonversiCutiaRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormCuti
        ?.values as ParameterShiftKerjaInterFace;

      dispatch(save(formValue));
    };
  };

  const save = (data: ParameterShiftKerjaInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterShiftKerjaInterFace>(
          urlApi.paramter.parameterShiftKerja,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterShiftKerja());
        dispatch(utilityActions.stopLoading());
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
        await deleteData<ParameterShiftKerjaInterFace>(
          `${urlApi.paramter.parameterShiftKerja}/${id}`
        );
        dispatch(actionParameter.getParameterShiftKerja());
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
