import { UserLoginInterFace } from "@/interface";

export const validateLogin = (values: UserLoginInterFace) => {
  const errors: Partial<UserLoginInterFace> = {};

  if (!values.user_id) {
    errors.user_id = "User Id harus diisi";
  }

  if (!values.password) {
    errors.password = "Password harus diisi";
  }

  return errors;
};
