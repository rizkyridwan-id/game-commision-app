import { getDataKasBon } from "./kasBon";
import { getPelanggaranPegawai } from "./pelanggaranPegawai";
import { getPengajuanCuti } from "./pengajuanCuti";
import { getPotonganLain } from "./potonganLain";
import { getReviewPengajuanCuti } from "./reviewCuti";

const actionTransaksi = {
  getPengajuanCuti,
  getReviewPengajuanCuti,
  getPelanggaranPegawai,
  getDataKasBon,
  getPotonganLain,
};

export { actionTransaksi };

export * from "./pengajuanCuti";
export * from "./reviewCuti";
export * from "./pelanggaranPegawai";
export * from "./kasBon";
export * from "./potonganLain";
