import { helperState } from "../action";
import { HelperActionTypes, helperAction } from "../action/helpers/type";

function initialState(): helperState {
  return {
    getIsLogin: false,
  };
}

const reducerHelper = (
  state: helperState = initialState(),
  action: helperAction
): helperState => {
  switch (action.type) {
    case HelperActionTypes.IS_LOGIN:
      return {
        ...state,
        getIsLogin: action.payload,
      };

    default:
      return state;
  }
};

export default reducerHelper;
