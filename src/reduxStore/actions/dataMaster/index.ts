import { getDataHariLibur } from "./dataHariLibur";
import { getDataJabatan } from "./dataJabatan";
import { getDataPegawai } from "./dataPegawai";
import { getDataToko } from "./dataToko";
import { getDataUser } from "./dataUser";

const actionMaster = {
  getDataJabatan,
  getDataUser,
  getDataHariLibur,
  getDataPegawai,
  getDataToko,
};

export { actionMaster };
export * from "./dataUser";
export * from "./dataJabatan";
export * from "./dataHariLibur";
export * from "./dataPegawai";
export * from "./dataToko";
