import { ParameterTargetInterFace } from "@/interface";

export enum ParameterTargetTokoType {
  GET_PARAMETER_TARGET_TOKO = "GET_PARAMETER_TARGET_TOKO",
}

export interface getParameterTargetTokoActionType {
  type: ParameterTargetTokoType.GET_PARAMETER_TARGET_TOKO;
  payload: {
    data: ParameterTargetInterFace[];
    total: number;
  };
}

export interface ParameterTargetTokoState {
  data: ParameterTargetInterFace[];
  total: number;
}
export type ParameterTargetTokoAction = getParameterTargetTokoActionType;
