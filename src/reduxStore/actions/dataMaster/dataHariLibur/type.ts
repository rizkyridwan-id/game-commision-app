import { HariLiburInterFace } from "@/interface";

export enum DataHariLiburType {
  GET_DATA_HARI_LIBUR = "GET_DATA_HARI_LIBUR",
}

export interface getDataHariLiburActionType {
  type: DataHariLiburType.GET_DATA_HARI_LIBUR;
  payload: {
    data: HariLiburInterFace[];
    total: number;
  };
}

export interface DataHariLiburState {
  data: HariLiburInterFace[];
  total: number;
}
export type DataHariLiburAction = getDataHariLiburActionType;
