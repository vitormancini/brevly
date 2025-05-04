import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 4px;
      background-color: ${(props) => props.theme["blue-base"]};
      color: ${(props) => props.theme["white"]};
      border-radius: 8px;
      border: none;
      padding: 1rem;
      cursor: pointer;
    }
  }
`;
