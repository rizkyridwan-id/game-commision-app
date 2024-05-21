import { PegawaiInterface } from "@/interface";
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

export const dataPegawaiRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormPegawai?.values as PegawaiInterface;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: PegawaiInterface) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<PegawaiInterface>(urlApi.dataMaster.pegawai, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionMaster.getDataPegawai());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormPegawai"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: PegawaiInterface) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<PegawaiInterface>(
          `${urlApi.dataMaster.pegawai}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(actionMaster.getDataPegawai());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormPegawai"));
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
        await deleteData<PegawaiInterface>(
          `${urlApi.dataMaster.pegawai}/${id}`
        );
        dispatch(actionMaster.getDataPegawai());
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
