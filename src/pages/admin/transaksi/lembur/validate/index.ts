import { LemburInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateLembur = (
  values: LemburInterFace
): FormErrors<LemburInterFace> => {
  const errors: FormErrors<LemburInterFace> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus diisi";
  }
  if (!values.kode_pegawai) {
    errors.kode_pegawai = "Kode Pegawai harus diisi";
  }
  if (!values.jam_awal) {
    errors.jam_awal = "Jam Awal harus diisi";
  }
  if (!values.jam_akhir) {
    errors.jam_akhir = "Jam Akhir harus diisi";
  }
  if (!values.tgl_lembur) {
    errors.tgl_lembur = "Tanggal Lembur harus diisi";
  }
  if (!values.total_rp) {
    errors.total_rp = "Total Rupiah harus diisi";
  }
  if (!values.keterangan) {
    errors.keterangan = "Keteranagn harus diisi";
  }

  if (values.jam_akhir < values.jam_awal) {
    errors.jam_akhir = "Jam akhir tidak boleh lebih dari jam awal";
  }
  if (values.jam_akhir === values.jam_awal) {
    errors.jam_akhir = "Jam akhir tidak boleh sama dengan jam awal";
  }

  return errors;
};
