import { ParameterTargetInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import {
  NotifInfo,
  NotifSuccess,
  deleteData,
  postData,
  putData,
  urlApi,
} from "@/utils";

export const parameterCutiRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormCuti?.values as ParameterTargetInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: ParameterTargetInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterTargetInterFace>(
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
  const edit = (data: ParameterTargetInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<ParameterTargetInterFace>(
          `${urlApi.paramter.parameterCuti}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionParameter.getParameterCuti());
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
        await deleteData<ParameterTargetInterFace>(
          `${urlApi.paramter.parameterCuti}/${id}`
        );
        dispatch(actionParameter.getParameterCuti());
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
