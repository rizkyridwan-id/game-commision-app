import { PotonganLainInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validatorPotongan = (
  values: PotonganLainInterFace
): FormErrors<PotonganLainInterFace> => {
  const errors: FormErrors<PotonganLainInterFace> = {};

  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode Pegawai harus diisi";
  }
  if (!values.qty_cicil_bulan) {
    errors.qty_cicil_bulan = "Lama cicilan harus diisi";
  }
  if (!values.total_rp) {
    errors.total_rp = "Total harus diisi";
  }
  if (!values.alasan) {
    errors.alasan = "Alasan harus diisi";
  }

  return errors;
};
