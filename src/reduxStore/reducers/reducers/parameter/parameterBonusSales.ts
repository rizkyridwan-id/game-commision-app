import {
  ParameterBonusSalesAction,
  ParameterBonusSalesState,
  ParameterBonusSalesType,
} from "@/reduxStore/actions";

const initialState: ParameterBonusSalesState = {
  data: [],
  total: 0,
};
const parameterBonusSalesReducer = (
  state: ParameterBonusSalesState = initialState,
  action: ParameterBonusSalesAction
) => {
  switch (action.type) {
    case ParameterBonusSalesType.GET_PARAMETER_BONUS:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterBonusSalesReducer;
