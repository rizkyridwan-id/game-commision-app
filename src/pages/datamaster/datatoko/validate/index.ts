import { DataTokoInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateToko = (
  values: DataTokoInterFace
): FormErrors<DataTokoInterFace> => {
  const errors: FormErrors<DataTokoInterFace> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus diisi";
  }

  if (!values.nama_toko) {
    errors.nama_toko = "Nama Toko harus diisi";
  }
  if (!values.alamat_toko) {
    errors.alamat_toko = "Alamat Toko harus diisi";
  }
  if (!values.portal) {
    errors.portal = "Portal harus diisi";
  }

  return errors;
};
