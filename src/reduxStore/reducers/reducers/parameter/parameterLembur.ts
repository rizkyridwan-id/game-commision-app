import {
  ParameterLemburAction,
  ParameterLemburState,
  ParameterLemburType,
} from "@/reduxStore/actions";

const initialState: ParameterLemburState = {
  data: [],
  total: 0,
};
const parameterLemburReducer = (
  state: ParameterLemburState = initialState,
  action: ParameterLemburAction
) => {
  switch (action.type) {
    case ParameterLemburType.GET_PARAMETER_LEMBUR:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterLemburReducer;
