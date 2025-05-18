import styled from "styled-components";

export const NotFoundContainer = styled.div`
  max-width: 580px;
  padding: 3rem 1.25rem;
  background-color: ${(props) => props.theme["gray-100"]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
  }

  h1 {
    font: ${(props) => props.theme["text-xl"]};
    color: ${(props) => props.theme["gray-600"]};
  }

  p {
    font: ${(props) => props.theme["text-md"]};
    color: ${(props) => props.theme["gray-500"]};
    text-align: center;
  }
`;
