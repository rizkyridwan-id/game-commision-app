import { DataUserInterFace } from "@/interface";

export const validateDataUser = (values: DataUserInterFace) => {
  const errors: Partial<DataUserInterFace> = {};

  if (!values.user_id) {
    errors.user_id = "User Id harus diisi";
  }
  if (!values.user_name) {
    errors.user_name = "Username harus diisi";
  }

  if (!values._id) {
    if (!values.password) {
      errors.password = "Password harus diisi";
    }
  }
  if (!values.level) {
    errors.level = "level harus dipilih";
  }

  return errors;
};
