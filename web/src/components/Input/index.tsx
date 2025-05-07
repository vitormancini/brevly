import { Warning } from "phosphor-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { ErrorMessage, InputContainer } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <InputContainer $isFocused={isFocused}>
        <label>{label}</label>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {error && (
          <ErrorMessage>
            <Warning />
            <span>{error}</span>
          </ErrorMessage>
        )}
      </InputContainer>
    );
  }
);
