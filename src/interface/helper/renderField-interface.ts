import { InputHTMLAttributes } from "react";

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  formGroup?: boolean;
  isNumber?: boolean;
  readOnly?: boolean;
  textColor?: string;
  iconFormGroup?: string;
  tabIndex?: number;
  // input: any;
  input: {
    target: any;
    name: string;
    value: any;
    onBlur: () => void;
    onChange: (value: any) => void;
    onFocus: () => void;
  };
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  noUpperCase?: string;
  placeholder?: string;
  customeCss?: string;
  titleTooltip?: string;
  iconOptional?: string;
  optionalLabel?: string;
  stylelabel?: React.CSSProperties;
  meta?: any;
  enableenter: boolean;
  inputGroup?: boolean;
  height?: number;
  width?: number;
  left?: boolean;
  right?: boolean;
  handleClick?: () => void;
  textIconGroup?: string;
}
