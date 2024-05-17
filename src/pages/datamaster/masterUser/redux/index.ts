import { MasterUserInterface } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";
import { NotifInfo, NotifSuccess, postData, putData, urlApi } from "@/utils";
import { reset } from "redux-form";

export const reduxMasterUser = () => {
  const prosesData = (data: MasterUserInterface): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      dispatch(utilityActions.setLoading({ screen: true }));
      if (state.utility.getModal.isEdit) {
        dispatch(edit(data));
      } else {
        dispatch(save(data));
      }
    };
  };

  const save = (data: MasterUserInterface): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(
          utilityActions.setLoading({
            screen: true,
          })
        );

        const newData = {
          username: data.username,
        };
        await postData<MasterUserInterface>(urlApi.dataMaster.user, newData);
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(utilityActions.hideModal());
        dispatch(utilityActions.stopLoading());
        dispatch(reset("FormMasterUser"));
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Disimpan"}`);
      }
    };
  };
  const edit = (data: MasterUserInterface): AppThunk => {
    return async (dispatch: AppDispatch) => {
      try {
        await putData<MasterUserInterface>(
          `${urlApi.dataMaster.user}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(reset("FormMasterUser"));
        dispatch(utilityActions.hideModal());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Data Gagal Diedit"}`);
      }
    };
  };

  return {
    prosesData,
  };
};
