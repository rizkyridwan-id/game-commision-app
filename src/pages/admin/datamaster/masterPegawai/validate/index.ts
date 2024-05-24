import { PegawaiInterface } from "@/interface";
import { FormErrors } from "redux-form";

export const validatePegawai = (
  values: PegawaiInterface
): FormErrors<PegawaiInterface> => {
  const errors: FormErrors<PegawaiInterface> = {};

  if (!values.gaji_pokok) {
    errors.gaji_pokok = "Gaji Pokok harus diisi";
  }
  if (!values.hari_libur) {
    errors.hari_libur = "Hari Libur harus diisi";
  }
  if (!values.jabatan) {
    errors.jabatan = "Jabatan harus dipilih";
  }
  if (!values.daily_break_minute) {
    errors.daily_break_minute = "Jam Break harus diisi";
  }
  if (!values.daily_rest_minute) {
    errors.daily_rest_minute = "Jam Istirahat harus diisi";
  }
  if (!values.daily_sholat_minute) {
    errors.daily_sholat_minute = "Jam Sholat harus diisi";
  }
  if (!values.cuti_tahunan) {
    errors.cuti_tahunan = "Jatah Cuti harus diisi";
  }
  if (!values.kode_sales) {
    errors.kode_sales = "Kode Sales harus diisi";
  }
  if (!values.nama_pegawai) {
    errors.nama_pegawai = "Nama Pegawai harus diisi";
  }
  if (!values.pin) {
    errors.pin = "Pin harus diisi";
  }
  if (!values.type_shift) {
    errors.type_shift = "Shift harus dipilih";
  }
  if (!values.tgl_lahir) {
    errors.tgl_lahir = "Tanggal Lahir harus diisi";
  }
  if (!values.tunjangan_jabatan) {
    errors.tunjangan_jabatan = "Tunjangan Jabatan harus diisi";
  }
  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus di pilih";
  }
  if (!values.hari_libur) {
    errors.hari_libur = "Hari Libur harus di pilih";
  }
  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode Pegawai harus di pilih";
  }

  return errors;
};
