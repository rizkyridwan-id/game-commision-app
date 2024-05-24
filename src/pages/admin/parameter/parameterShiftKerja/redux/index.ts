import { ParameterShiftKerjaInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, postData, urlApi } from "@/utils";

export const parameterShiftKerjaRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormShiftKerja
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

  return {
    prosesData,
  };
};
