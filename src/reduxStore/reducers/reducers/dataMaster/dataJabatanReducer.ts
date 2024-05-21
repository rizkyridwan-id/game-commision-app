import {
  DataJabataAction,
  DataJabataState,
  DataJabatanType,
} from "@/reduxStore/actions";

const initialState: DataJabataState = {
  data: [],
  total: 0,
};
const dataJabatanReducer = (
  state: DataJabataState = initialState,
  action: DataJabataAction
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
