import {
  ParameterTargetSalesAction,
  ParameterTargetSalesState,
  ParameterTargetSalesType,
} from "@/reduxStore/actions";

const initialState: ParameterTargetSalesState = {
  data: [],
  total: 0,
};
const parameterTargetSalesReducer = (
  state: ParameterTargetSalesState = initialState,
  action: ParameterTargetSalesAction
) => {
  switch (action.type) {
    case ParameterTargetSalesType.GET_PARAMETER_TARGET_SALES:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterTargetSalesReducer;
