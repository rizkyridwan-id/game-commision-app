import {
  PelanggaranPegawaiAction,
  PelanggaranPegawaiState,
  PelanggaranPegawaiType,
} from "@/reduxStore";

const initialState: PelanggaranPegawaiState = {
  data: [],
  total: 0,
};
const pelanggaranPegawaiReducer = (
  state: PelanggaranPegawaiState = initialState,
  action: PelanggaranPegawaiAction
) => {
  switch (action.type) {
    case PelanggaranPegawaiType.GET_DATA_PELANGGARAN_PEGAWAI:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export default pelanggaranPegawaiReducer;
