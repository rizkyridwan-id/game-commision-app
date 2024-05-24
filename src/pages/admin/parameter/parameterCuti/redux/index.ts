import { ParameterCutiInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, postData, urlApi } from "@/utils";

export const parameterCutiRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormCuti?.values as ParameterCutiInterFace;

      dispatch(save(formValue));
    };
  };

  const save = (data: ParameterCutiInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterCutiInterFace>(
          urlApi.paramter.parameterCuti,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterCuti());
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
