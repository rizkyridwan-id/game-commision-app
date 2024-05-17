import React from "react";
import { WrappedFieldProps } from "redux-form";

interface RenderCheckboxProps extends WrappedFieldProps {
  label: string;
  name: string;
  className: string;
}
const RenderCheckbox: React.FC<RenderCheckboxProps> = ({
  input,
  label,
  name,
  className,
}) => (
  <div className={`form-check ${className ? className : ""}`}>
    <label
      className="form-check-label"
      htmlFor={name}
      style={{ cursor: "pointer" }}
    >
      <input
        {...input}
        className="form-check-input"
        type="checkbox"
        id={name}
      />
      {label}
    </label>
  </div>
);
export default RenderCheckbox;
