import { PotonganLainInterFace } from "@/interface";

export enum PotonganLainType {
  GET_POTONGAN_LAIN = "GET_POTONGAN_LAIN",
}

export interface getPotonganLainActionType {
  type: PotonganLainType.GET_POTONGAN_LAIN;
  payload: {
    data: PotonganLainInterFace[];
    total: number;
  };
}

export interface PotonganLainState {
  data: PotonganLainInterFace[];
  total: number;
}
export type PotonganLainAction = getPotonganLainActionType;
