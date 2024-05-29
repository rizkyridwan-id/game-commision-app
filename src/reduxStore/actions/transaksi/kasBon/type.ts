import { KasBonInterFace } from "@/interface";

export enum KasBonType {
  GET_DATA_KAS_BON = "GET_DATA_KAS_BON",
}

export interface getKasBonActionType {
  type: KasBonType.GET_DATA_KAS_BON;
  payload: {
    data: KasBonInterFace[];
    total: number;
  };
}

export interface KasBonState {
  data: KasBonInterFace[];
  total: number;
}
export type KasBonAction = getKasBonActionType;
