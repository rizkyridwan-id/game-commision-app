import { ParameterKonversiCutiInterFace } from "@/interface";

export enum ParameterKonversiCutiType {
  GET_PARAMETER_KONVERSI_CUTI = "GET_PARAMETER_KONVERSI_CUTI",
}

export interface getParameterKonversiCutiActionType {
  type: ParameterKonversiCutiType.GET_PARAMETER_KONVERSI_CUTI;
  payload: {
    data: ParameterKonversiCutiInterFace[];
    total: number;
  };
}

export interface ParameterKonversiCutiState {
  data: ParameterKonversiCutiInterFace[];
  total: number;
}
export type ParameterKonversiCutiAction = getParameterKonversiCutiActionType;
