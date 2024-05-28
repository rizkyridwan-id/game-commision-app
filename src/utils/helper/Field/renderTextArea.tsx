import React from "react";
import { Tooltip } from "antd";
import { IFieldProps } from "@/interface";

const RenderTextArea: React.FC<IFieldProps> = ({
  label,
  readOnly,
  placeholder,
  id,
  customeCss,
  minLength,
  input,
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
  height,
  width,
}) => {
  const showError = meta?.touched && meta?.error;

  return (
    <div className="mb-3">
      {label && (
        <label className="form-floating mb-2" style={stylelabel}>
          {label || <>&nbsp;</>}
          {optionalLabel && (
            <span style={{ color: "#b8b8b8" }}>({optionalLabel})</span>
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
            onClick={handleClick}
            className="input-group-text"
            id={id}
            style={{ cursor: handleClick ? "pointer" : "auto" }}
          >
            {textIconGroup}
          </span>
        )}

        <textarea
          {...input}
          onKeyPress={(event) => {
            if (!enableenter && event.key === "Enter") {
              event.preventDefault();
            }
          }}
          autoComplete="off"
          id={id}
          className={`form-control ${showError ? "is-invalid" : ""} ${
            meta.valid ? (readOnly === undefined ? "is-valid" : "") : ""
          } ${customeCss || ""}`}
          readOnly={readOnly}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={height}
          cols={width}
          value={
            noUpperCase ? input?.value : (input?.value?.toUpperCase() as string)
          }
          style={{
            textTransform: noUpperCase ? "none" : "uppercase",
            lineHeight: "1.9",
          }}
        />

        {inputGroup && right && (
          <span
            onClick={handleClick}
            className="input-group-text"
            id={id}
            style={{ cursor: handleClick ? "pointer" : "auto" }}
          >
            {textIconGroup}
          </span>
        )}

        {showError && <div className="invalid-feedback">{meta?.error}.</div>}
      </div>
    </div>
  );
};

export default RenderTextArea;
