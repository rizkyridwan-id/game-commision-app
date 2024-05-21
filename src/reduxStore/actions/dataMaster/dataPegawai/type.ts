import { PegawaiInterface } from "@/interface";

export enum DataPegawaiType {
  GET_DATA_PEGAWAI = "GET_DATA_PEGAWAI",
}

export interface getDataPegawaiActionType {
  type: DataPegawaiType.GET_DATA_PEGAWAI;
  payload: {
    data: PegawaiInterface[];
    total: number;
  };
}

export interface DataPegawaiState {
  data: PegawaiInterface[];
  total: number;
}
export type DataPegawaiAction = getDataPegawaiActionType;
