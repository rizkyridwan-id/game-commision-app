import { DataUserAction, DataUserState, DataUserType } from "@/reduxStore";

const initialState: DataUserState = {
  data: [],
  total: 0,
};
const dataUserReducer = (
  state: DataUserState = initialState,
  action: DataUserAction
) => {
  switch (action.type) {
    case DataUserType.GET_DATA_USER:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default dataUserReducer;
