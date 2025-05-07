import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 1rem;
      background-color: ${(props) => props.theme["blue-base"]};
      color: ${(props) => props.theme["white"]};
      border-radius: 8px;
      border: none;
      padding: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${(props) => props.theme["blue-dark"]};
      }
    }
  }
`;

export const LinksListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ExportButton = styled.button`
  position: absolute;
  right: 0;
  top: -2.8rem;
  width: fit-content;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme["gray-200"]};
  color: ${(props) => props.theme["gray-600"]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme["gray-300"]};
  }
`;
