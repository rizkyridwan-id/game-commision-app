import { ParameterShiftKerjaInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateParameterShiftKerja = (
  values: ParameterShiftKerjaInterFace
): FormErrors<ParameterShiftKerjaInterFace> => {
  const errors: FormErrors<ParameterShiftKerjaInterFace> = {};

  if (!values.start_time) {
    errors.start_time = "Dari Jam Datang harus diisi";
  }
  if (!values.due_time) {
    errors.due_time = "Sampai Jam Datang harus diisi";
  }
  if (!values.work_end_time) {
    errors.work_end_time = "Jam Pulang harus diisi";
  }

  return errors;
};
