import { Tooltip } from "antd";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { RenderSelectProps, SelectOption } from "@/interface";

const RenderSelect = ({
  label,
  meta,
  options,
  optionalLabel,
  iconOptional,
  titleTooltip,
  input,
  noUpperCase,
  placeholder,
  async,
  disabled,
  asyncOptions,
}: RenderSelectProps) => {
  // Handle perubahan nilai pada pilihan
  const handleChange = (selectedOption?: SelectOption | null) => {
    const value = selectedOption
      ? typeof selectedOption.value === "number" || noUpperCase
        ? selectedOption.value
        : selectedOption.value?.toUpperCase()
      : "";

    input.onChange(value);
  };

  // Tampilkan pesan error jika diperlukan
  const showError = meta?.touched && meta?.error;

  return (
    <div className="form-group">
      {label && (
        <label className="mb-2">
          {label}
          {optionalLabel && (
            <span style={{ color: "#b8b8b8" }}> ( {optionalLabel} )</span>
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

      {async ? (
        // Komponen AsyncSelect untuk pilihan asinkron
        <AsyncSelect
          onChange={handleChange}
          loadOptions={asyncOptions}
          cacheOptions={false}
          placeholder={placeholder?.toUpperCase()}
          isClearable={true}
          closeMenuOnSelect={true}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
              textTransform: !noUpperCase ? "uppercase" : "none",
              minHeight: "30px",
            }),
            control: (base, { isFocused }) => {
              const hasValue = Boolean(input.value);
              return {
                ...base,
                boxShadow: "none",
                borderColor: showError
                  ? "#ff5b57"
                  : isFocused || hasValue
                    ? "#00acac"
                    : "#d9d9d9",
                "&:hover": {
                  borderColor: showError
                    ? "#ff5b57"
                    : isFocused || hasValue
                      ? "#00acac"
                      : "#d9d9d9",
                },
              };
            },
          }}
        />
      ) : (
        // Komponen Select untuk pilihan sinkron
        <Select
          isDisabled={disabled}
          options={options}
          placeholder={placeholder?.toUpperCase()}
          isClearable={true}
          closeMenuOnSelect={true}
          value={options.find((option) => option.value === input.value) || null}
          onChange={handleChange}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
              textTransform: !noUpperCase ? "uppercase" : "none",
              minHeight: "30px",
            }),
            control: (base, { isFocused }) => {
              const hasValue = Boolean(input.value);
              return {
                ...base,
                boxShadow: "none",
                borderColor: showError
                  ? "#ff5b57"
                  : isFocused || hasValue
                    ? "#00acac"
                    : "#d9d9d9",
                "&:hover": {
                  borderColor: showError
                    ? "#ff5b57"
                    : isFocused || hasValue
                      ? "#00acac"
                      : "#d9d9d9",
                },
              };
            },
          }}
          className={`${showError ? "is-invalid" : ""} ${
            meta.valid ? "is-valid" : ""
          }`}
        />
      )}

      {showError && <div className="invalid-feedback">{meta?.error}.</div>}
    </div>
  );
};

export default RenderSelect;
