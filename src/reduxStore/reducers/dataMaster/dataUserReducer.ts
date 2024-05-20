import { DataUserState, UserAction, UserActionTypes } from "@/reduxStore";

const initialState: DataUserState = {
  loading: false,
  data: [],
  error: null,
};
const dataUserReducer = (
  state: DataUserState = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        total: 0,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        total: action.payload.total,
      };
    case UserActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: "error",
      };
    default:
      return state;
  }
};

export default dataUserReducer;
