import { PayrollInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validatePayroll = (
  values: PayrollInterFace
): FormErrors<PayrollInterFace> => {
  const errors: FormErrors<PayrollInterFace> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus diisi";
  }
  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode Pegawai harus diisi";
  }
  if (!values.nama_pegawai) {
    errors.nama_pegawai = "Nama Pegawai harus diisi";
  }

  return errors;
};
