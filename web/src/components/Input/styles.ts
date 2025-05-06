import styled from "styled-components";

interface InputContainerProps {
  $isFocused: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  color: ${(props) => props.theme["gray-400"]};

  label {
    font: ${(props) => props.theme["text-sm"]};
    transition: color 0.3s;
    color: ${(props) =>
      props.$isFocused ? props.theme["blue-base"] : props.theme["gray-400"]};
  }

  input {
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    padding: 1rem;
    margin-bottom: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: ${(props) => props.theme["blue-base"]};
    }
  }
`;
