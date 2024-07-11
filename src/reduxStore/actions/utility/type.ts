import { Action } from "redux";

export const AppActionTypes = {
  HIDE_MODAL: "HIDE_MODAL",
  SHOW_MODAL: "SHOW_MODAL",
  IS_LOADING: "IS_LOADING",
  IS_EDIT: "IS_EDIT",
  GET_DATA_EDIT: "GET_DATA_EDIT",
  LOADING_TABEL: "LOADING_TABEL",
  SIMPAN_DATA_TMP: "SIMPAN_DATA_TMP",
  SHOW_BUTTON_DELETE: "SHOW_BUTTON_DELETE",
  SCREEN_SIZE: "SCREEN_SIZE",
  DATA_NOTA: "DATA_NOTA",
  GET_MODULE: "GET_MODULE",
} as const;

export interface ScreenSizeAction
  extends Action<typeof AppActionTypes.SCREEN_SIZE> {
  payload: string;
}

export interface HideModalAction<T>
  extends Action<typeof AppActionTypes.HIDE_MODAL> {
  payload: ModalData<T>;
}

export interface ShowModalAction<T>
  extends Action<typeof AppActionTypes.SHOW_MODAL> {
  payload: ModalData<T>;
}

export interface SetLoadingAction
  extends Action<typeof AppActionTypes.IS_LOADING> {
  payload: LoadingData;
}

export interface SetIsEditAction extends Action<typeof AppActionTypes.IS_EDIT> {
  payload: boolean;
}

export interface SimpanDataTmpAction<T>
  extends Action<typeof AppActionTypes.SIMPAN_DATA_TMP> {
  payload: DataTmp<T>;
}
export interface ShowButtonDelete
  extends Action<typeof AppActionTypes.SHOW_BUTTON_DELETE> {
  payload: boolean;
}

export interface GetDataEditAction
  extends Action<typeof AppActionTypes.GET_DATA_EDIT> {
  payload: [];
}
export interface GetDataModule<T>
  extends Action<typeof AppActionTypes.GET_MODULE> {
  payload: getModule<T>;
}

export interface LoadingTabelAction
  extends Action<typeof AppActionTypes.LOADING_TABEL> {
  payload: boolean;
}
export interface NotaAction<T> extends Action<typeof AppActionTypes.DATA_NOTA> {
  payload: NotaData<T>;
}

export interface LoadingData {
  table?: boolean;
  button?: boolean;
  screen?: boolean;
}
export interface NotaData<T> {
  data?: T;
}
export interface ModalData<T> {
  isModalShow: boolean;
  isEdit: boolean;
  data?: T;
  namaForm?: string;
  title: string;
}

export interface DataTmp<T> {
  data: T;
  namaForm?: string;
}
interface getModule<T> {
  data: T;
}
export interface UtilityState<T> {
  getLoading: LoadingData;
  setLoadingTabel: boolean;
  getShowButtonDelete: boolean;
  getDataEdit: [];
  getScreenSize: string;
  getModal: ModalData<T>;
  hideModal: ModalData<T>;
  getDataTmp: DataTmp<T>;
  getNota: NotaData<T>;
  getModule: getModule<T>;
}

export type AppActionUtility<T> =
  | HideModalAction<T>
  | ShowModalAction<T>
  | SetLoadingAction
  | SetIsEditAction
  | GetDataEditAction
  | ShowButtonDelete
  | GetDataModule<T>
  | ScreenSizeAction
  | SimpanDataTmpAction<T>
  | NotaAction<T>
  | LoadingTabelAction;
