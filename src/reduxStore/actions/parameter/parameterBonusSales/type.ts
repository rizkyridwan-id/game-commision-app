import { ParameterBonusSalesInterFace } from "@/interface";

export enum ParameterBonusSalesType {
  GET_PARAMETER_BONUS = "GET_PARAMETER_BONUS",
}

export interface getParameterBonusSalesActionType {
  type: ParameterBonusSalesType.GET_PARAMETER_BONUS;
  payload: {
    data: ParameterBonusSalesInterFace[];
    total: number;
  };
}

export interface ParameterBonusSalesState {
  data: ParameterBonusSalesInterFace[];
  total: number;
}
export type ParameterBonusSalesAction = getParameterBonusSalesActionType;
