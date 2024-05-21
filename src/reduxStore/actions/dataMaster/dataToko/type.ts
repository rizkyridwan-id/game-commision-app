import { DataTokoInterFace } from "@/interface";

export enum DataTokoType {
  GET_DATA_TOKO = "GET_DATA_TOKO",
}

export interface getDataTokoActionType {
  type: DataTokoType.GET_DATA_TOKO;
  payload: {
    data: DataTokoInterFace[];
    total: number;
  };
}

export interface DataTokoState {
  data: DataTokoInterFace[];
  total: number;
}
export type DataTokoAction = getDataTokoActionType;
