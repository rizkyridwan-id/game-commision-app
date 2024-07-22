import { ParameterLemburInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterLembur = (
  values: ParameterLemburInterFace
): FormErrors<ParameterLemburInterFace> => {
  const errors: FormErrors<ParameterLemburInterFace> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus di pilih";
  }
  if (!values.jam_awal) {
    errors.jam_awal = "Jam Awal harus di isi";
  }
  if (!values.jam_akhir) {
    errors.jam_akhir = "Jam Akhir harus di isi";
  }
  if (!values.total_rp) {
    errors.total_rp = "Total harus di isi";
  }

  if (values.jam_akhir < values.jam_awal) {
    errors.jam_akhir = "Jam akhir tidak boleh lebih dari jam awal";
  }

  return errors;
};
