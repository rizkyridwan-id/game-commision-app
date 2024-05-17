import { InputHTMLAttributes } from "react";
import { WrappedFieldMetaProps } from "redux-form";

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  formGroup?: boolean;
  readOnly?: boolean;
  textColor?: string;
  iconFormGroup?: string;
  tabIndex?: number;
  // input: any;
  isNumber?: boolean;
  noUpperCase?: string;
  // input: React.ChangeEvent<HTMLInputElement>;
  input: {
    target: {
      files?: FileList;
      name: string;
      value: any;
    };
    value: any;
    onBlur: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
  };
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  minLength?: number;
  maxLength?: number;
  nouperCase?: string;
  placeholder?: string;
  customeCss?: string;
  titleTooltip?: string;
  iconOptional?: string;
  optionalLabel?: string;
  width: number;
  height: number;
  stylelabel?: React.CSSProperties;
  meta: WrappedFieldMetaProps; // Sesuaikan dengan kebutuhan sebenarnya
  enableenter: boolean;
  inputGroup?: boolean;
  left?: boolean;
  right?: boolean;
  handleClick?: () => void;
  textIconGroup?: string;
}
