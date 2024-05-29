import { FormFilterLaporanDto } from "@/interface";
import { FormErrors } from "redux-form";

export const validatePayroll = (
  values: FormFilterLaporanDto
): FormErrors<FormFilterLaporanDto> => {
  const errors: FormErrors<FormFilterLaporanDto> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode toko harus dipilih";
  }
  if (!values.start_date) {
    errors.start_date = "Bulan Awal harus diisi";
  }
  if (!values.end_date) {
    errors.end_date = "Bulan Akhir Dari harus diisi";
  }

  return errors;
};
