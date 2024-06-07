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

  if (values.due_time) {
    if (values.due_time === values.start_time) {
      errors.due_time = "Sampai Jam Datang tidak boleh sama dengan Jam Datang";
    }
  }

  // if (values.start_time && values.due_time) {
  //   const startTime = new Date(`1970-01-01T${values.start_time}:00`);
  //   const dueTime = new Date(`1970-01-01T${values.due_time}:00`);

  //   if (dueTime.getTime() < startTime.getTime()) {
  //     errors.due_time =
  //       "Sampai Jam Datang tidak boleh kurang dari dari jam datang";
  //   } else {
  //     const oneHourInMillis = 60 * 60 * 1000;
  //     if (dueTime.getTime() - startTime.getTime() > oneHourInMillis) {
  //       errors.due_time =
  //         "Sampai Jam Datang tidak boleh lebih dari 1 jam setelah Dari dari jam datang";
  //     }
  //   }
  // }

  return errors;
};
