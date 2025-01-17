import { AppActionTypes, AppActionUtility, UtilityState } from "../../actions";

function initialState<T>(): UtilityState<T> {
  return {
    getLoading: {
      table: false,
      button: false,
      screen: false,
    },

    getModal: {
      isModalShow: false,
      isEdit: false,
      data: [] as T,
      namaForm: "",
      title: "",
    },
    hideModal: {
      isModalShow: false,
      isEdit: false,
      data: [] as T,
      namaForm: "",
      title: "",
    },
    setLoadingTabel: false,
    getShowButtonDelete: false,
    getDataEdit: [],
    getDataTmp: {
      data: [] as T,
    },
    getNota: {
      data: [] as T,
    },
    getModule: {
      data: [] as T,
    },

    getScreenSize: "lg",
  };
}

const utility = <T>(
  state: UtilityState<T> = initialState(),
  action: AppActionUtility<T>
): UtilityState<T> => {
  switch (action.type) {
    case AppActionTypes.SHOW_BUTTON_DELETE:
      return {
        ...state,
        getShowButtonDelete: action.payload,
      };

    case AppActionTypes.LOADING_TABEL:
      return {
        ...state,
        setLoadingTabel: action.payload,
      };
    case AppActionTypes.GET_DATA_EDIT:
      return {
        ...state,
        getDataEdit: action.payload,
      };
    case AppActionTypes.IS_LOADING:
      return {
        ...state,
        getLoading: action.payload,
      };

    case AppActionTypes.HIDE_MODAL:
      return {
        ...state,
        hideModal: action.payload,
      };
    case AppActionTypes.SHOW_MODAL:
      return {
        ...state,
        getModal: action.payload,
      };
    case AppActionTypes.SIMPAN_DATA_TMP:
      return {
        ...state,
        getDataTmp: action.payload,
      };
    case AppActionTypes.GET_MODULE:
      return {
        ...state,
        getModule: action.payload,
      };

    case AppActionTypes.SCREEN_SIZE:
      return {
        ...state,
        getScreenSize: action.payload,
      };
    case AppActionTypes.DATA_NOTA:
      return {
        ...state,
        getNota: action.payload,
      };

    default:
      return state;
  }
};

export default utility;
