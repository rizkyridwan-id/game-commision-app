import { SinkronDataPegawaiInterFace } from "@/interface";
import { FormErrors } from "redux-form";

export const validateSinkronDataPegawai = (
  values: SinkronDataPegawaiInterFace
): FormErrors<SinkronDataPegawaiInterFace> => {
  const errors: FormErrors<SinkronDataPegawaiInterFace> = {};

  if (!values.kode_toko) {
    errors.kode_toko = "Kode Toko harus dipilih";
  }

  return errors;
};
