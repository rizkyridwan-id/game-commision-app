import { ParameterShiftKerjaInterFace } from "@/interface";

export enum ParameterShiftKerjaType {
  GET_PARAMETER_SHIFT_KERJA = "GET_PARAMETER_SHIFT_KERJA",
}

export interface getParameterShiftKerjaActionType {
  type: ParameterShiftKerjaType.GET_PARAMETER_SHIFT_KERJA;
  payload: {
    data: ParameterShiftKerjaInterFace[];
    total: number;
  };
}

export interface ParameterShiftKerjaState {
  data: ParameterShiftKerjaInterFace[];
  total: number;
}
export type ParameterShiftKerjaAction = getParameterShiftKerjaActionType;
