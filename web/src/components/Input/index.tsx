import { useState } from "react";
import { InputContainer } from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
}

export function Input({ label, placeholder }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer $isFocused={isFocused}>
      <label htmlFor="link">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </InputContainer>
  );
}
