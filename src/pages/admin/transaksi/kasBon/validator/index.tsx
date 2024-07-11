import { KasBonInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validasiKasbon = (
  values: KasBonInterFace
): FormErrors<KasBonInterFace> => {
  const errors: FormErrors<KasBonInterFace> = {};

  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode Pegawai harus diisi";
  }
  if (!values.lama_cicilan) {
    errors.lama_cicilan = "Lama cicilan harus diisi";
  }
  if (!values.total_kasbon) {
    errors.total_kasbon = "Total kasbon harus diisi";
  }
  if (!values.alasan_kasbon) {
    errors.alasan_kasbon = "Alasan harus diisi";
  }

  return errors;
};
