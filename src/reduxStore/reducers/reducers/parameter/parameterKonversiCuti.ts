import {
  ParameterKonversiCutiAction,
  ParameterKonversiCutiState,
  ParameterKonversiCutiType,
} from "@/reduxStore/actions";

const initialState: ParameterKonversiCutiState = {
  data: [],
  total: 0,
};
const parameterKonversiCutiReducer = (
  state: ParameterKonversiCutiState = initialState,
  action: ParameterKonversiCutiAction
) => {
  switch (action.type) {
    case ParameterKonversiCutiType.GET_PARAMETER_KONVERSI_CUTI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default parameterKonversiCutiReducer;
