import { ParameterLemburInterFace } from "@/interface";

export enum ParameterLemburType {
  GET_PARAMETER_LEMBUR = "GET_PARAMETER_LEMBUR",
}

export interface getParameterLemburActionType {
  type: ParameterLemburType.GET_PARAMETER_LEMBUR;
  payload: {
    data: ParameterLemburInterFace[];
    total: number;
  };
}

export interface ParameterLemburState {
  data: ParameterLemburInterFace[];
  total: number;
}
export type ParameterLemburAction = getParameterLemburActionType;
