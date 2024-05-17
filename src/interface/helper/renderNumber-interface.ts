import { WrappedFieldMetaProps } from "redux-form";

export interface CurrencyInputProps {
  isi: number;
  label: string;
  placeholder: string;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
  id?: string;
  customeCss?: string;
  name?: string;
  isRp?: boolean;
  noUpperCase?: boolean; // Perbaikan typo pada prop name
  isPhone?: boolean;
  readOnly?: boolean;
  customCss?: string; // Perbaikan typo pada prop name
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Sesuaikan dengan kebutuhan sebenarnya
  meta: WrappedFieldMetaProps; // Sesuaikan dengan kebutuhan sebenarnya
  onValueChange?: (value: number) => void; // Sesuaikan dengan kebutuhan sebenarnya
}
