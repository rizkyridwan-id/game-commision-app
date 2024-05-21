import { ParameterTargetInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParamaterTarget = (
  values: ParameterTargetInterFace
): FormErrors<ParameterTargetInterFace> => {
  const errors: FormErrors<ParameterTargetInterFace> = {};

  if (!values.target) {
    errors.target = "Target harus diisi";
  }
  if (!values.tipe_target) {
    errors.tipe_target = "Tipe target harus dipilih";
  }

  return errors;
};
