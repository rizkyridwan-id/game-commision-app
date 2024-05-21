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
import { Menu } from "@/config";
import {
  DataUserInterFace,
  HakAksesInterFace,
  SearchInterface,
} from "@/interface";

export const datauserController = () => {
  const prosesData = (
    data: DataUserInterFace,
    hakAkses: HakAksesInterFace[]
  ): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      if (state.utility.getModal.isEdit) {
        dispatch(edit(data, hakAkses));
      } else {
        dispatch(save(data, hakAkses));
      }
    };
  };

  const save = (
    data: DataUserInterFace,
    hakAkses: HakAksesInterFace[]
  ): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(
          utilityActions.setLoading({
            screen: true,
          })
        );
        await postData<DataUserInterFace>(urlApi.dataMaster.user, {
          ...data,
          hak_akses_json: JSON.stringify(hakAkses),
        });
        dispatch(actionMaster.getDataUser());
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(utilityActions.hideModal());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormUser"));
        dispatch(
          utilityActions.simpanDataTmp({
            data: Menu,
          })
        );
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Disimpan"}`);
      }
    };
  };
  const edit = (
    data: DataUserInterFace,
    hakAkses: HakAksesInterFace[]
  ): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        await putData<DataUserInterFace>(
          `${urlApi.dataMaster.user}/${data._id}`,
          {
            ...data,
            hak_akses_json: JSON.stringify(hakAkses),
          }
        );
        dispatch(actionMaster.getDataUser());
        NotifSuccess("Data Berhasil Diedit");
        dispatch(reset("FormUser"));
        dispatch(utilityActions.hideModal());
        dispatch(
          utilityActions.simpanDataTmp({
            data: Menu,
          })
        );
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Diedit"}`);
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
        await deleteData<DataUserInterFace>(`${urlApi.dataMaster.user}/${id}`);
        dispatch(actionMaster.getDataUser());
        NotifSuccess("Data Berhasil Dihapus");
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Hapus"}`);
      }
    };
  };

  const nextPageWithSearch = (row?: SearchInterface): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        actionMaster.getDataUser({
          skip: row?.skip,
          limit: row?.limit,
          q: row?.q,
        })
      );
    };
  };

  return {
    nextPageWithSearch,
    prosesData,
    removeData,
  };
};
