import { InputHTMLAttributes } from "react";
import { WrappedFieldMetaProps } from "redux-form";

export interface HiddenFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  input: React.InputHTMLAttributes<HTMLInputElement>;
  type: string;
  readOnly: boolean;
  value: string;
  id: string;
  meta: WrappedFieldMetaProps;
  customeCss?: string;
}
