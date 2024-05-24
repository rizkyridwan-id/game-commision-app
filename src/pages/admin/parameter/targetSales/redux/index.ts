import { ParameterTargetInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, postData, urlApi } from "@/utils";

export const parameterTargetSalesRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormTargetSales
        ?.values as ParameterTargetInterFace;

      dispatch(save(formValue));
    };
  };

  const save = (data: ParameterTargetInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterTargetInterFace>(
          urlApi.paramter.targetSales,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterTargetSales());
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
