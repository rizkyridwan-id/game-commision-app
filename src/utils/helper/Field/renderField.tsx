import React from "react";
import { Tooltip } from "antd";
import { IFieldProps } from "@/interface";

const ReanderField: React.FC<IFieldProps> = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  id,
  ref,
  customeCss,
  min,
  max,
  minLength,
  maxLength,
  stylelabel,
  iconOptional,
  optionalLabel,
  titleTooltip,
  noUpperCase,
  meta,
  enableenter,
  inputGroup,
  left,
  right,
  handleClick,
  textIconGroup,
  isNumber,
  accept,
}) => {
  const showError = meta?.touched && meta?.error;

  return (
    <div className="mb-3">
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

        <input
          {...input}
          onKeyPress={(event) => {
            if (!enableenter && event.key === "Enter") {
              event.preventDefault(); //<===== This stops the form from being submitted
            }
          }}
          ref={ref}
          autoComplete="off"
          id={id}
          type={type}
          accept={type === "file" ? accept : ""}
          value={
            type === "file"
              ? (input?.target?.files as unknown as FileList)
              : noUpperCase
                ? input?.value
                : type === "date"
                  ? input?.value
                  : isNumber
                    ? Number(input?.value)
                    : typeof input?.value === "number"
                      ? Number(input?.value)
                      : (input?.value?.toUpperCase() as string)
          }
          className={`form-control  ${showError ? "is-invalid" : ""} ${
            meta.valid ? readOnly === undefined && "is-valid" : ""
          } ${customeCss || ""}`}
          readOnly={readOnly}
          minLength={minLength}
          maxLength={maxLength}
          min={min}
          max={max}
          placeholder={placeholder}
          style={{
            textTransform: noUpperCase ? "none" : "uppercase",
            lineHeight: "1.9",
          }}
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

export default ReanderField;
