import { ParameterCutiInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterCuti = (
  values: ParameterCutiInterFace
): FormErrors<ParameterCutiInterFace> => {
  const errors: FormErrors<ParameterCutiInterFace> = {};

  if (!values.leave_request_gap_days) {
    errors.leave_request_gap_days = "Jangka Waktu Pengajuan Cuti harus diisi";
  }

  return errors;
};
