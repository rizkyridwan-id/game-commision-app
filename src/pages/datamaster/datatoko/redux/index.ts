import { DataTokoInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionMaster,
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
import { reset } from "redux-form";

export const dataTokoRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormDataToko?.values as DataTokoInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: DataTokoInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<DataTokoInterFace>(urlApi.dataMaster.toko, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionMaster.getDataToko());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormDataToko"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: DataTokoInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<DataTokoInterFace>(
          `${urlApi.dataMaster.toko}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionMaster.getDataToko());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormDataToko"));
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
        await deleteData<DataTokoInterFace>(`${urlApi.dataMaster.toko}/${id}`);
        dispatch(actionMaster.getDataToko());
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
