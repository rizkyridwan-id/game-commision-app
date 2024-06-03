// validatePengajuanCuti
import { PengajuanCutiInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validatePengajuanCuti = (
  values: PengajuanCutiInterFace
): FormErrors<PengajuanCutiInterFace> => {
  const errors: FormErrors<PengajuanCutiInterFace> = {};

  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode pegawai harus diisi";
  }
  if (!values.leave_start_date) {
    errors.leave_start_date = "Cuti Dari harus diisi";
  }
  if (!values.leave_end_date) {
    errors.leave_end_date = "Cuti Sampai harus diisi";
  }
  if (!values.leave_description) {
    errors.leave_description = "Alasan harus diisi";
  }

  if (values.leave_end_date < values.leave_start_date) {
    errors.leave_end_date =
      "Tanggal Akhir cuti tidak boleh kurang dari awal cuti";
  }

  return errors;
};
