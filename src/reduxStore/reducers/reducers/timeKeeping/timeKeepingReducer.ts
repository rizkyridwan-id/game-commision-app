import {
  TimeKeepingAction,
  TimeKeepingState,
  TimeKeepingType,
} from "@/reduxStore";

const initialState: TimeKeepingState = {
  data: [],
  total: 0,
};
const timeKeepingReducer = (
  state: TimeKeepingState = initialState,
  action: TimeKeepingAction
) => {
  switch (action.type) {
    case TimeKeepingType.GET_DATA_TIME_KEEPING:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default timeKeepingReducer;
