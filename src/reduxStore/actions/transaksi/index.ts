import { getDataKasBon } from "./kasBon";
import { getPelanggaranPegawai } from "./pelanggaranPegawai";
import { getPengajuanCuti } from "./pengajuanCuti";
import { getReviewPengajuanCuti } from "./reviewCuti";

const actionTransaksi = {
  getPengajuanCuti,
  getReviewPengajuanCuti,
  getPelanggaranPegawai,
  getDataKasBon,
};

export { actionTransaksi };

export * from "./pengajuanCuti";
export * from "./reviewCuti";
export * from "./pelanggaranPegawai";
export * from "./kasBon";
