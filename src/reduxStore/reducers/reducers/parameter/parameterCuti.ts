import {
  ParameterCutiAction,
  ParameterCutiState,
  ParameterCutiType,
} from "@/reduxStore/actions";

const initialState: ParameterCutiState = {
  data: [],
  total: 0,
};
const parameterCutiReducer = (
  state: ParameterCutiState = initialState,
  action: ParameterCutiAction
) => {
  switch (action.type) {
    case ParameterCutiType.GET_PARAMETER_CUTI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterCutiReducer;
