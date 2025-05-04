import { InputContainer } from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
}

export function Input({ label, placeholder }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor="link">{label}</label>
      <input type="text" placeholder={placeholder} />
    </InputContainer>
  );
}
