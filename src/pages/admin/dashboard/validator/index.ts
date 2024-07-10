import { FormErrors } from "redux-form";
import { LaporanTimeKeepingDto } from "../../laporan";

export const ValidatorTglTimeKeeping = (
  values: LaporanTimeKeepingDto
): FormErrors<LaporanTimeKeepingDto> => {
  const errors: FormErrors<LaporanTimeKeepingDto> = {};

  if (!values.start_date) {
    errors.start_date = "Tanggal Libur harus diisi";
  }
  if (!values.end_date) {
    errors.end_date = "Deskripsi harus diisi";
  }

  if (values.start_date && values.end_date) {
    const startDate = new Date(values.start_date);
    const endDate = new Date(values.end_date);
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000; // 1 minggu dalam milidetik

    if (endDate.getTime() - startDate.getTime() > oneWeekMs) {
      errors.start_date = "Rentang tanggal tidak boleh lebih dari satu minggu";
      errors.end_date = "Rentang tanggal tidak boleh lebih dari satu minggu";
    }
  }

  return errors;
};
