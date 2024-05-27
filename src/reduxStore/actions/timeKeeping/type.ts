import { TimeKeepingKehadiranInterFace } from "@/interface";

export enum TimeKeepingType {
  GET_DATA_TIME_KEEPING = "GET_DATA_TIME_KEEPING",
}

export interface getTimeKeepingActionType {
  type: TimeKeepingType.GET_DATA_TIME_KEEPING;
  payload: {
    data: TimeKeepingKehadiranInterFace[];
    total: number;
  };
}

export interface TimeKeepingState {
  data: TimeKeepingKehadiranInterFace[];
  total: number;
}
export type TimeKeepingAction = getTimeKeepingActionType;
