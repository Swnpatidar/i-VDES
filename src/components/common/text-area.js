const TextArea= ({
    className,
    type,
    value,
    name,
    id,
    placeholder,
    handleChange,
    error,
    labelName,
    showastrict=false,
    lableclassName,
    disabled
  }) => {
    return (
      <div>
        <div className="input-container">
          <label className={lableclassName}>
            {labelName} {showastrict && <span className="text-danger">*</span>}
          </label>
          <textarea
            required
            type={type}
            name={name}
            value={value}
            className={`form-control p-20 ${className} ${
              error && "border-danger bg-error"
            }`}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}  
          />
        </div>
      </div>
    );
  };
  
  export default TextArea;
  