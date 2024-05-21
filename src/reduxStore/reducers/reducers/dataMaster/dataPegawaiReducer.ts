import {
  DataPegawaiAction,
  DataPegawaiState,
  DataPegawaiType,
} from "@/reduxStore/actions";

const initialState: DataPegawaiState = {
  data: [],
  total: 0,
};
const dataPegawaiReducer = (
  state: DataPegawaiState = initialState,
  action: DataPegawaiAction
) => {
  switch (action.type) {
    case DataPegawaiType.GET_DATA_PEGAWAI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default dataPegawaiReducer;
