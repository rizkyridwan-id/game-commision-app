import { PengajuanCutiInterFace } from "@/interface";

export enum PengajuanCutiType {
  GET_DATA_CUTI = "GET_DATA_CUTI",
}

export interface getPengajuanCutiActionType {
  type: PengajuanCutiType.GET_DATA_CUTI;
  payload: {
    data: PengajuanCutiInterFace[];
    total: number;
  };
}

export interface PengajuanCutiState {
  data: PengajuanCutiInterFace[];
  total: number;
}
export type PengajuanCutiAction = getPengajuanCutiActionType;
