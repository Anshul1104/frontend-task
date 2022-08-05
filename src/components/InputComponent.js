const InputComponent = ({
  type = "text",
  onChange,
  value,
  onBlur,
  required,
  defaultValue,
  min,
  readOnly,
  placeholder = "",
  autoFocus = false,
  className,
}) => {
  return (
    <>
      <div className="relative">
        <input
          type={type}
          className={`form-control ${className} `}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          required={required}
          defaultValue={defaultValue}
          min={min}
          readOnly={readOnly}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </div>
    </>
  );
};

export default InputComponent;
