import { WrappedFieldMetaProps } from "redux-form";

export interface SelectOption {
  value: string;
  label: string;
}

export interface RenderSelectProps {
  label: string;
  meta: WrappedFieldMetaProps; // Gantilah dengan jenis data yang sesuai
  options: SelectOption[];
  optionalLabel: string | undefined;
  iconOptional: boolean | undefined;
  titleTooltip: string | undefined;
  noUpperCase: string | undefined;
  input: {
    value: string;
    onChange: (value: string) => void;
  };
  disabled?: boolean;
  nouperCase: boolean | undefined;
  placeholder: string;
  async: boolean | undefined;
  asyncOptions?: () => Promise<SelectOption[]>; // Tentukan jenis yang sesuai
}
