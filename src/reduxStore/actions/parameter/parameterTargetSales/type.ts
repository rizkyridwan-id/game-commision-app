import { ParameterTargetInterFace } from "@/interface";

export enum ParameterTargetSalesType {
  GET_PARAMETER_TARGET_SALES = "GET_PARAMETER_TARGET_SALES",
}

export interface getParameterTargetSalesActionType {
  type: ParameterTargetSalesType.GET_PARAMETER_TARGET_SALES;
  payload: {
    data: ParameterTargetInterFace[];
    total: number;
  };
}

export interface ParameterTargetSalesState {
  data: ParameterTargetInterFace[];
  total: number;
}
export type ParameterTargetSalesAction = getParameterTargetSalesActionType;
