import { HariLiburInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateHariLibur = (
  values: HariLiburInterFace
): FormErrors<HariLiburInterFace> => {
  const errors: FormErrors<HariLiburInterFace> = {};

  if (!values.tgl_libur) {
    errors.tgl_libur = "Tanggal Libur harus diisi";
  }
  if (!values.deskripsi) {
    errors.deskripsi = "Deskripsi harus diisi";
  }

  return errors;
};
