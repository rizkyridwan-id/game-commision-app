import { getDataJabatan } from "./dataJabatan";
import { getDataUser } from "./dataUser";

const actionMaster = {
  getDataJabatan,
  getDataUser,
};

export { actionMaster };
export * from "./dataUser";
export * from "./dataJabatan";
