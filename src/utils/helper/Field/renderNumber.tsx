import { CurrencyInputProps, TypeInputOnChangeValue } from "@/interface";
import { NumericFormat } from "react-number-format";
import { WrappedFieldProps } from "redux-form";

interface TypeValueChange {
  formattedValue: string;
  value: string;
  floatValue: number | undefined; // Make floatValue accept undefined
}
export const RenderNumber: React.FC<CurrencyInputProps & WrappedFieldProps> = ({
  label,
  placeholder,
  input,
  isRp,
  noUpperCase,
  readOnly,
  meta,
  id,
  customeCss,
}) => {
  const handleChange = (values: TypeValueChange) => {
    input.onChange(values.floatValue || 0);
  };

  const showError = meta?.touched && meta?.error;

  return (
    <div className="mb-3">
      <label className="mb-2">{label || <> &nbsp; </>} </label>
      <NumericFormat
        id={id}
        allowLeadingZeros
        readOnly={readOnly}
        thousandSeparator={isRp ? "," : ""}
        onValueChange={handleChange}
        placeholder={placeholder}
        style={{
          textTransform: !noUpperCase ? "uppercase" : "none",
          lineHeight: "1.9",
        }}
        className={`form-control ${showError && "is-invalid "} ${
          meta.valid && "is-valid"
        } ${customeCss ? customeCss : ""} `}
        value={input.value}
        onFocus={(e: TypeInputOnChangeValue) => e.target.select()}
      />

      {showError && <div className="invalid-feedback">{meta?.error}.</div>}
    </div>
  );
};

export default RenderNumber;
