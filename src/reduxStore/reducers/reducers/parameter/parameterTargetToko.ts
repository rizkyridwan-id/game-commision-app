import {
  ParameterTargetTokoAction,
  ParameterTargetTokoState,
  ParameterTargetTokoType,
} from "@/reduxStore/actions";

const initialState: ParameterTargetTokoState = {
  data: [],
  total: 0,
};
const parameterTargetTokoReducer = (
  state: ParameterTargetTokoState = initialState,
  action: ParameterTargetTokoAction
) => {
  switch (action.type) {
    case ParameterTargetTokoType.GET_PARAMETER_TARGET_TOKO:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterTargetTokoReducer;
