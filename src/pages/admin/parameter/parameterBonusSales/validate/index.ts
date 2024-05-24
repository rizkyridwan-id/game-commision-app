import { ParameterBonusSalesInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterBonusSales = (
  values: ParameterBonusSalesInterFace
): FormErrors<ParameterBonusSalesInterFace> => {
  const errors: FormErrors<ParameterBonusSalesInterFace> = {};

  if (!values.bonus_beli) {
    errors.bonus_beli = "Jabatan harus diisi";
  }

  return errors;
};
