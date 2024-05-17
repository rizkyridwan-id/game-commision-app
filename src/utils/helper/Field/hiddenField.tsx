import { HiddenFieldProps } from "@/interface";

export const HiddenField: React.FC<HiddenFieldProps> = ({
  input,
  type,
  readOnly,
  placeholder,
  value,
  id,
}) => (
  <input
    {...input}
    autoComplete="off"
    type={type}
    id={id}
    className={`form-control`}
    readOnly={readOnly}
    defaultValue={value}
    placeholder={placeholder}
  />
);

export default HiddenField;
