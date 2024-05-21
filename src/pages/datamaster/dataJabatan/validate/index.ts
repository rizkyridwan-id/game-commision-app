import { DataJabatanInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateJabatan = (
  values: DataJabatanInterFace
): FormErrors<DataJabatanInterFace> => {
  const errors: FormErrors<DataJabatanInterFace> = {};

  if (!values.jabatan) {
    errors.jabatan = "Jabatan harus diisi";
  }

  return errors;
};
