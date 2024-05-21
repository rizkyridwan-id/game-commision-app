import { HariLiburInterFace } from "@/interface";
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

export const dataHariLiburRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormHariLibur?.values as HariLiburInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: HariLiburInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<HariLiburInterFace>(urlApi.dataMaster.hariLibur, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(utilityActions.stopLoading());
        dispatch(actionMaster.getDataHariLibur());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormHariLibur"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: HariLiburInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<HariLiburInterFace>(
          `${urlApi.dataMaster.hariLibur}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(utilityActions.stopLoading());
        dispatch(actionMaster.getDataHariLibur());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormHariLibur"));
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
        await deleteData<HariLiburInterFace>(
          `${urlApi.dataMaster.hariLibur}/${id}`
        );
        dispatch(actionMaster.getDataHariLibur());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormHariLibur"));
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
