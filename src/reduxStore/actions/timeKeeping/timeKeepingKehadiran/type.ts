import { TimeKeepingKehadiranInterFace } from "@/interface";

export enum TimeKeepingKehadiranType {
  GET_TIME_KEEPING_KEHADIRAN = "GET_TIME_KEEPING_KEHADIRAN",
}

export interface getTimeKeepingKehadiranActionType {
  type: TimeKeepingKehadiranType.GET_TIME_KEEPING_KEHADIRAN;
  payload: {
    data: TimeKeepingKehadiranInterFace[];
    total: number;
  };
}

export interface TimeKeepingKehadiranState {
  data: TimeKeepingKehadiranInterFace[];
  total: number;
}
export type TimeKeepingKehadiranAction = getTimeKeepingKehadiranActionType;
