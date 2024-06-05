import { CurrencyInputProps, TypeInputOnChangeValue } from "@/interface";
import { Tooltip } from "antd";
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
  optionalLabel,
  stylelabel,
  iconOptional,
  titleTooltip,
  inputGroup,
  left,
  textIconGroup,
  right,
  handleClick,
}) => {
  const handleChange = (values: TypeValueChange) => {
    input.onChange(values.floatValue || 0);
  };

  const showError = meta?.touched && meta?.error;

  return (
    <div className="mb-3">
      {/* <label className="mb-2">{label || <> &nbsp; </>} </label> */}
      {label && (
        <label className="form-floating mb-2" style={stylelabel}>
          {label || <>&nbsp;</>}{" "}
          {optionalLabel && (
            <>
              <span style={{ color: "#b8b8b8" }}>({optionalLabel})</span>
            </>
          )}
          {iconOptional && (
            <>
              &nbsp;
              <Tooltip placement="right" title={titleTooltip}>
                <i
                  className="fa fa-info-circle iconOptional"
                  style={{ color: "#b8b8b8" }}
                />
              </Tooltip>
            </>
          )}
        </label>
      )}
      <div className={inputGroup ? "input-group" : ""}>
        {inputGroup && left && (
          <span
            onClick={() => handleClick && handleClick()}
            className="input-group-text"
            // id={id}
          >
            {textIconGroup}
          </span>
        )}
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

        {inputGroup && right && (
          <span
            onClick={() => handleClick && handleClick()}
            style={{ cursor: handleClick ? "pointer" : "auto" }}
            className="input-group-text"
          >
            {textIconGroup}
          </span>
        )}

        {showError && <div className="invalid-feedback">{meta?.error}.</div>}
      </div>
    </div>
  );
};

export default RenderNumber;
