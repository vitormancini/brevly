import { Link } from "react-router-dom";
import styled from "styled-components";

export const RedirectContainer = styled.div`
  max-width: 366px;
  padding: 3rem 1.25rem;
  background-color: ${(props) => props.theme["gray-100"]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;

  img {
    width: 46px;
  }

  h1 {
    font: ${(props) => props.theme["text-xl"]};
    color: ${(props) => props.theme["gray-600"]};
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 4px;
  }

  p {
    font: ${(props) => props.theme["text-md"]};
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme["blue-base"]};
`;
