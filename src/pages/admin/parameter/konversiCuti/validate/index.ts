import { ParameterKonversiCutiInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterKonversiCuti = (
  values: ParameterKonversiCutiInterFace
): FormErrors<ParameterKonversiCutiInterFace> => {
  const errors: FormErrors<ParameterKonversiCutiInterFace> = {};

  if (!values.total_rp) {
    errors.total_rp = "Total Rp harus diisi";
  }

  return errors;
};
