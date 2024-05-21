import {
  ParameterShiftKerjaAction,
  ParameterShiftKerjaState,
  ParameterShiftKerjaType,
} from "@/reduxStore/actions";

const initialState: ParameterShiftKerjaState = {
  data: [],
  total: 0,
};
const parameterShiftKerjaReducer = (
  state: ParameterShiftKerjaState = initialState,
  action: ParameterShiftKerjaAction
) => {
  switch (action.type) {
    case ParameterShiftKerjaType.GET_PARAMETER_SHIFT_KERJA:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterShiftKerjaReducer;
