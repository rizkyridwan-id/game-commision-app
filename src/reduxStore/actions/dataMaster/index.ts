import { getDataHariLibur } from "./dataHariLibur";
import { getDataJabatan } from "./dataJabatan";
import { getDataPegawai } from "./dataPegawai";
import { getDataUser } from "./dataUser";

const actionMaster = {
  getDataJabatan,
  getDataUser,
  getDataHariLibur,
  getDataPegawai,
};

export { actionMaster };
export * from "./dataUser";
export * from "./dataJabatan";
export * from "./dataHariLibur";
export * from "./dataPegawai";
