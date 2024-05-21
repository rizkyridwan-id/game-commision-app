import { DataJabatanInterFace } from "@/interface";

export enum DataJabatanType {
  GET_DATA_JABATAN = "GET_DATA_JABATAN",
}

export interface getDataJabatanActionType {
  type: DataJabatanType.GET_DATA_JABATAN;
  payload: {
    data: DataJabatanInterFace[];
    total: number;
  };
}

export interface DataJabatanState {
  data: DataJabatanInterFace[];
  total: number;
}
export type DataJabatanAction = getDataJabatanActionType;
