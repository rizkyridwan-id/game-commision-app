import {
  PotonganLainAction,
  PotonganLainState,
  PotonganLainType,
} from "@/reduxStore";

const initialState: PotonganLainState = {
  data: [],
  total: 0,
};
const potonganLainReducer = (
  state: PotonganLainState = initialState,
  action: PotonganLainAction
) => {
  switch (action.type) {
    case PotonganLainType.GET_POTONGAN_LAIN:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default potonganLainReducer;
