import {
  TimeKeepingKehadiranAction,
  TimeKeepingKehadiranState,
  TimeKeepingKehadiranType,
} from "@/reduxStore";

const initialState: TimeKeepingKehadiranState = {
  data: [],
  total: 0,
};
const timeKeepingKehadiranReducer = (
  state: TimeKeepingKehadiranState = initialState,
  action: TimeKeepingKehadiranAction
) => {
  switch (action.type) {
    case TimeKeepingKehadiranType.GET_TIME_KEEPING_KEHADIRAN:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default timeKeepingKehadiranReducer;
