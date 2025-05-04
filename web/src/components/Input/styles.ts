import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  color: ${(props) => props.theme["gray-400"]};

  label {
    font: ${(props) => props.theme["text-sm"]};
  }

  input {
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
