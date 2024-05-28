import {
  ReviewPengajuanCutiAction,
  ReviewPengajuanCutiState,
  ReviewPengajuanCutiType,
} from "@/reduxStore";

const initialState: ReviewPengajuanCutiState = {
  data: [],
  total: 0,
};
const reviewPengajuanCutiReducer = (
  state: ReviewPengajuanCutiState = initialState,
  action: ReviewPengajuanCutiAction
) => {
  switch (action.type) {
    case ReviewPengajuanCutiType.GET_REVIEW_DATA_CUTI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default reviewPengajuanCutiReducer;
