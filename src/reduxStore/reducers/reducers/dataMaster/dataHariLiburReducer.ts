import {
  DataHariLiburAction,
  DataHariLiburState,
  DataHariLiburType,
} from "@/reduxStore/actions";

const initialState: DataHariLiburState = {
  data: [],
  total: 0,
};
const dataHariLiburReducer = (
  state: DataHariLiburState = initialState,
  action: DataHariLiburAction
) => {
  switch (action.type) {
    case DataHariLiburType.GET_DATA_HARI_LIBUR:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default dataHariLiburReducer;
