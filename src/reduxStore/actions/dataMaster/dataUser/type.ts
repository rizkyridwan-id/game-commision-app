import { DataUserInterFace } from "@/interface";

export enum DataUserType {
  GET_DATA_USER = "GET_DATA_USER",
}

export interface getDataUserActionType {
  type: DataUserType.GET_DATA_USER;
  payload: {
    data: DataUserInterFace[];
    total: number;
  };
}
export interface fetchDataUserAction {
  type: DataUserType.GET_DATA_USER;
  payload: {
    data: DataUserInterFace[];
    total: number;
  };
}
export interface DataUserState {
  data: DataUserInterFace[];
  total: number;
}

export type DataUserAction = getDataUserActionType;
