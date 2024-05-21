import { helperState } from "../../actions";
import { HelperActionTypes, helperAction } from "../../actions/helpers/type";

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
