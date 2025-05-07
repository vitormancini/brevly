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

    &:last-of-type {
      margin-top: 1rem;
    }
  }

  input {
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    padding: 1rem;
    outline: none;
    transition: border-color 0.3s;
    color: ${(props) => props.theme["gray-600"]};

    &:focus {
      border-color: ${(props) => props.theme["blue-base"]};
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & > svg {
    color: ${(props) => props.theme["danger"]};
  }

  span {
    font: ${(props) => props.theme["text-sm"]};
  }
`;
