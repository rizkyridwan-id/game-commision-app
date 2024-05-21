import { ParameterShiftKerjaInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterShiftKerja = (
  values: ParameterShiftKerjaInterFace
): FormErrors<ParameterShiftKerjaInterFace> => {
  const errors: FormErrors<ParameterShiftKerjaInterFace> = {};

  if (!values.dari_jam_datang) {
    errors.dari_jam_datang = "Dari Jam Datang harus diisi";
  }
  if (!values.sampai_jam_datang) {
    errors.sampai_jam_datang = "Sampai Jam Datang harus diisi";
  }
  if (!values.jam_pulang) {
    errors.jam_pulang = "Jam Pulang harus diisi";
  }

  return errors;
};
