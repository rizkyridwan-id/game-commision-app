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
  if (!values.jam_break) {
    errors.jam_break = "Jam Break harus diisi";
  }
  if (!values.jam_istirahat) {
    errors.jam_istirahat = "Jam Istirahat harus diisi";
  }
  if (!values.jam_sholat) {
    errors.jam_sholat = "Jam Sholat harus diisi";
  }
  if (!values.jatah_cuti) {
    errors.jatah_cuti = "Jatah Cuti harus diisi";
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
  if (!values.shift) {
    errors.shift = "Shift harus dipilih";
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

  return errors;
};
