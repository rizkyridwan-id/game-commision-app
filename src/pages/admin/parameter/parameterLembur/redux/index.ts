import { ParameterLemburInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import {
  calculateTotalHours,
  deleteData,
  NotifInfo,
  NotifSuccess,
  postData,
  putData,
  timeout,
  urlApi,
} from "@/utils";
import { change } from "redux-form";

export const parameterLemburRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormLembur
        ?.values as ParameterLemburInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };
  const hitungTotalJam = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      timeout(100);
      const state = getState();
      const formValue = state.form.FormLembur
        ?.values as ParameterLemburInterFace;

      if (formValue?.jam_awal && formValue?.jam_akhir) {
        const cekJam = calculateTotalHours(
          formValue.jam_awal,
          formValue.jam_akhir
        );
        console.log(cekJam);
        dispatch(change("FormLembur", "total", cekJam));
      }

      //   dispatch(save(formValue));
    };
  };

  const save = (data: ParameterLemburInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterLemburInterFace>(
          urlApi.paramter.parameterLembur,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterLembur());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: ParameterLemburInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<ParameterLemburInterFace>(
          urlApi.paramter.parameterLembur + `/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterLembur());
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
        await deleteData(`${urlApi.paramter.parameterLembur}/${id}`);
        dispatch(actionParameter.getParameterLembur());
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
    hitungTotalJam,
    removeData,
  };
};
