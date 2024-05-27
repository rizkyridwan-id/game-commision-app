import { FormErrors } from "redux-form";
import { LaporanTimeKeepingDto } from "../dto";

export const validateLaporanTimeKeeping = (
  values: LaporanTimeKeepingDto
): FormErrors<LaporanTimeKeepingDto> => {
  const errors: FormErrors<LaporanTimeKeepingDto> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode toko harus dipilih";
  }
  if (!values.tgl_system) {
    errors.tgl_system = "Tanggal harus diisi";
  }
  if (!values.type_shift) {
    errors.type_shift = "Type Shift harus diisi";
  }

  return errors;
};
