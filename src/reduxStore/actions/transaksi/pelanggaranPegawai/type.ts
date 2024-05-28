import { PelanggaranPegawaiInterFace } from "@/interface";

export enum PelanggaranPegawaiType {
  GET_DATA_PELANGGARAN_PEGAWAI = "GET_DATA_PELANGGARAN_PEGAWAI",
}

export interface getPelanggaranPegawaiActionType {
  type: PelanggaranPegawaiType.GET_DATA_PELANGGARAN_PEGAWAI;
  payload: {
    data: PelanggaranPegawaiInterFace[];
    total: number;
  };
}

export interface PelanggaranPegawaiState {
  data: PelanggaranPegawaiInterFace[];
  total: number;
}
export type PelanggaranPegawaiAction = getPelanggaranPegawaiActionType;
