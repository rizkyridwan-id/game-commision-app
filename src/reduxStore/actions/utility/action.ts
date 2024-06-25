import { Dispatch } from "react";
import { AppDispatch, AppThunk } from "../..";
import {
  AppActionTypes,
  DataTmp,
  GetDataEditAction,
  LoadingData,
  LoadingTabelAction,
  ModalData,
  NotaAction,
  NotaData,
  ScreenSizeAction,
  SetIsEditAction,
  SetLoadingAction,
  ShowButtonDelete,
  ShowModalAction,
  SimpanDataTmpAction,
} from "./type";
import { NotifInfo } from "@/utils";

const setLoading = (data: LoadingData): SetLoadingAction => ({
  type: AppActionTypes.IS_LOADING,
  payload: data,
});
const setScreenSize = (value: string): ScreenSizeAction => ({
  type: AppActionTypes.SCREEN_SIZE,
  payload: value,
});
const stopLoading = (): SetLoadingAction => ({
  type: AppActionTypes.IS_LOADING,
  payload: {
    screen: false,
    table: false,
    button: false,
  },
});

const showButtonDelete = (data: boolean): ShowButtonDelete => ({
  type: AppActionTypes.SHOW_BUTTON_DELETE,
  payload: data,
});
const isEdit = (data: boolean): SetIsEditAction => ({
  type: AppActionTypes.IS_EDIT,
  payload: data,
});

const getDataEdit = (data: []): GetDataEditAction => ({
  type: AppActionTypes.GET_DATA_EDIT,
  payload: data,
});

const loadingTabel = (data: boolean): LoadingTabelAction => ({
  type: AppActionTypes.LOADING_TABEL,
  payload: data,
});

export const showModal = <T>(data: ModalData<T>): AppThunk => {
  return async (dispatch: Dispatch<ShowModalAction<T>>) => {
    dispatch({
      type: AppActionTypes.SHOW_MODAL,
      payload: data,
    });
  };
};

export const simpanDataTmp = <T>(data: DataTmp<T>): AppThunk => {
  return async (dispatch: Dispatch<SimpanDataTmpAction<T>>) => {
    dispatch({
      type: AppActionTypes.SIMPAN_DATA_TMP,
      payload: data,
    });
  };
};
export const hideModal = (): AppThunk => {
  return async (dispatch: Dispatch<ShowModalAction<[]>>) => {
    dispatch({
      type: AppActionTypes.SHOW_MODAL,
      payload: {
        isModalShow: false,
        isEdit: false,
        data: [],
        namaForm: "",
        title: "",
      },
    });
  };
};
const setLaporanKosong = <T>(
  namaForm: string,
  errorMessage?: string
): AppThunk => {
  return async (dispatch: AppDispatch) => {
    NotifInfo(errorMessage || "Laporan Tidak Tersedia");
    const dataTmp: DataTmp<T[]> = {
      data: [],
      namaForm: namaForm,
    };
    dispatch(simpanDataTmp(dataTmp));
    dispatch(stopLoading());
  };
};

const setDataNota = <T>(data: NotaData<T>): AppThunk => {
  return async (dispatch: Dispatch<NotaAction<T>>) => {
    dispatch({
      type: AppActionTypes.DATA_NOTA,
      payload: data,
    });
  };
};
const utilityActions = {
  simpanDataTmp,
  setLaporanKosong,
  getDataEdit,
  setDataNota,
  setLoading,
  isEdit,
  showModal,
  hideModal,
  loadingTabel,
  stopLoading,
  showButtonDelete,
  setScreenSize,
};
export default utilityActions;
