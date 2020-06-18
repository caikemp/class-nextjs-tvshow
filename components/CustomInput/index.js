import { useState } from "react";

const CustomInput = ({
  name,
  placeholder = "",
  value,
  onChange = () => {},
  onBlur,
  type = "text",
}) => {
  const [error, setError] = useState("");
  const handleBlur = () => {
    if (onBlur) {
      const isValid = onBlur(value);
      isValid ? setError("") : setError(`Invalid ${name}`);
    }
  };
  return (
    <div className="custom-input">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CustomInput;
