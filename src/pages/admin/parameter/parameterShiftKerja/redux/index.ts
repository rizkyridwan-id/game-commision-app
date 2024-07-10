import { FormOtorisasiDto } from "@/components";
import { ParameterShiftKerjaInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  actionParameter,
  utilityActions,
} from "@/reduxStore";
import { NotifInfo, NotifSuccess, postData, putData, urlApi } from "@/utils";
import { reset } from "redux-form";

export const parameterShiftKerjaRedux = () => {
  const prosesData = (): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      const state = getState();
      const formValue = state.form.FormShiftKerja
        ?.values as ParameterShiftKerjaInterFace;

      if (state.utility.getModal.isEdit) {
        dispatch(
          utilityActions.showModal({
            title: "Otorisasi",
            isModalShow: true,
            isEdit: false,
            data: formValue,
          })
        );
        // dispatch(edit(formValue));
      } else {
        dispatch(save(formValue));
      }
    };
  };

  const edit = (data: ParameterShiftKerjaInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await putData<ParameterShiftKerjaInterFace>(
          `${urlApi.paramter.parameterShiftKerja}/${data._id}`,
          data
        );
        NotifSuccess("Data Berhasil Diedit");
        dispatch(utilityActions.stopLoading());
        dispatch(actionParameter.getParameterShiftKerja());
        dispatch(utilityActions.hideModal());
        dispatch(reset("FormShiftKerja"));
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };

  const save = (data: ParameterShiftKerjaInterFace) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData<ParameterShiftKerjaInterFace>(
          urlApi.paramter.parameterShiftKerja,
          data
        );
        NotifSuccess("Data Berhasil Disimpan");
        dispatch(actionParameter.getParameterShiftKerja());
        dispatch(utilityActions.stopLoading());
        dispatch(utilityActions.hideModal());
      } catch (error) {
        NotifInfo(`${error}`);
        dispatch(utilityActions.stopLoading());
      }
    };
  };

  const cekUser = (data: FormOtorisasiDto): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
      try {
        dispatch(utilityActions.setLoading({ screen: true }));
        await postData(urlApi.otorisasi, {
          user_id: data.user_id,
          password: data.password,
        });

        const state = getState();
        const formValue = state.utility.getModal
          ?.data as unknown as ParameterShiftKerjaInterFace;

        dispatch(edit(formValue));
        dispatch(utilityActions.stopLoading());
      } catch (error) {
        dispatch(utilityActions.stopLoading());
        NotifInfo(`${error || "Terjadi Kesalahan Saat Mngirim data"}`);
      }
    };
  };

  return {
    edit,
    prosesData,
    cekUser,
  };
};
