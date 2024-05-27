import {
  PengajuanCutiAction,
  PengajuanCutiState,
  PengajuanCutiType,
} from "@/reduxStore";

const initialState: PengajuanCutiState = {
  data: [],
  total: 0,
};
const pengajuanCutiReducer = (
  state: PengajuanCutiState = initialState,
  action: PengajuanCutiAction
) => {
  switch (action.type) {
    case PengajuanCutiType.GET_DATA_CUTI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default pengajuanCutiReducer;
