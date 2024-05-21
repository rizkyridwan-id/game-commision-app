import {
  DataTokoAction,
  DataTokoState,
  DataTokoType,
} from "@/reduxStore/actions";

const initialState: DataTokoState = {
  data: [],
  total: 0,
};
const dataTokoReducer = (
  state: DataTokoState = initialState,
  action: DataTokoAction
) => {
  switch (action.type) {
    case DataTokoType.GET_DATA_TOKO:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default dataTokoReducer;
