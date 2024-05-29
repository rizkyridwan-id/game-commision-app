import { KasBonAction, KasBonState, KasBonType } from "@/reduxStore";

const initialState: KasBonState = {
  data: [],
  total: 0,
};
const KasBonReducer = (
  state: KasBonState = initialState,
  action: KasBonAction
) => {
  switch (action.type) {
    case KasBonType.GET_DATA_KAS_BON:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default KasBonReducer;
