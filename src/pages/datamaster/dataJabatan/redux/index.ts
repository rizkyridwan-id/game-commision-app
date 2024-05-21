import { DataJabatanInterFace } from "@/interface";
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

export const dataJabatanRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormDataJabatan
        ?.values as DataJabatanInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const save = (data: DataJabatanInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<DataJabatanInterFace>(urlApi.dataMaster.jabatan, data);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(utilityActions.stopLoading());
        dispatch(actionMaster.getDataJabatan());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };
  const edit = (data: DataJabatanInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<DataJabatanInterFace>(
          `${urlApi.dataMaster.jabatan}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(utilityActions.stopLoading());
        dispatch(actionMaster.getDataJabatan());
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
        await deleteData<DataJabatanInterFace>(
          `${urlApi.dataMaster.jabatan}/${id}`
        );
        dispatch(actionMaster.getDataJabatan());
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
