import {
  DataJabatanAction,
  DataJabatanState,
  DataJabatanType,
} from "@/reduxStore/actions";

const initialState: DataJabatanState = {
  data: [],
  total: 0,
};
const dataJabatanReducer = (
  state: DataJabatanState = initialState,
  action: DataJabatanAction
) => {
  switch (action.type) {
    case DataJabatanType.GET_DATA_JABATAN:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default dataJabatanReducer;
