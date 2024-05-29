import { FormFilterLaporanDto } from "@/interface";
import { FormErrors } from "redux-form";

export const validateLaporanPelanggaran = (
  values: FormFilterLaporanDto
): FormErrors<FormFilterLaporanDto> => {
  const errors: FormErrors<FormFilterLaporanDto> = {};

  if (!values.start_date) {
    errors.start_date = "Tanggal Awal harus diisi";
  }
  if (!values.end_date) {
    errors.end_date = "Tanggal Akhir harus diisi";
  }
  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus dipilih";
  }

  return errors;
};
