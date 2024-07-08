import { ParameterCutiInterFace } from "@/interface";

export enum ParameterCutiType {
  GET_PARAMETER_CUTI = "GET_PARAMETER_CUTI",
}

export interface getParameterCutiActionType {
  type: ParameterCutiType.GET_PARAMETER_CUTI;
  payload: {
    data: ParameterCutiInterFace[];
    total: number;
  };
}

export interface ParameterCutiState {
  data: ParameterCutiInterFace[];
  total: number;
}
export type ParameterCutiAction = getParameterCutiActionType;
