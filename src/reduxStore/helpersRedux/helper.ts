import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";

export interface ModalInterFace<T> {
  isEdit: boolean;
  data?: T;
  title: string;
  namaForm?: string;
}
export const utilityController = <T>() => {
  const showModal = <T>(data: ModalInterFace<T>): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.showModal({
          isModalShow: true,
          isEdit: data.isEdit,
          title: data.title,
          data: data.data || [],
          namaForm: data.namaForm,
        })
      );
    };
  };
  const hideModal = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.showModal({
          isModalShow: false,
          isEdit: false,
          data: [],
          namaForm: "",
          title: "",
        })
      );
    };
  };

  const simpanDataTmp = (namaForm: string, data?: T): AppThunk => {
    return async (dispatch: AppDispatch) => {
      dispatch(
        utilityActions.simpanDataTmp({
          data: data,
          namaForm: namaForm,
        })
      );
    };
  };

  return {
    simpanDataTmp,
    showModal,
    hideModal,
  };
};
