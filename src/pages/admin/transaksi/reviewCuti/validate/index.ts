import { FormErrors } from "redux-form";
import { ReviewCutiDto } from "../dto";

export const validateReviewCuti = (
  values: ReviewCutiDto
): FormErrors<ReviewCutiDto> => {
  const errors: FormErrors<ReviewCutiDto> = {};

  if (!values.status_validasi) {
    errors.status_validasi = "Status Validasi harus dipilih";
  }

  if (values.status_validasi === "REJECT") {
    if (!values.reject_description) {
      errors.reject_description = "Deskripsi Reject harus diisi";
    }
  }
  return errors;
};
