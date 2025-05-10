import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid ${(props) => props.theme["gray-300"]};

  span {
    font: ${(props) => props.theme["text-sm"]};
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const LinkArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font: ${(props) => props.theme["text-sm"]};
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font: ${(props) => props.theme["text-md"]};
  color: ${(props) => props.theme["blue-base"]};
  font-weight: bold;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    margin-right: 16px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme["gray-200"]};
    color: ${(props) => props.theme["gray-600"]};
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 0.5rem;
    cursor: pointer;
    transition: border-color 0.3s;

    &:hover {
      border-color: ${(props) => props.theme["blue-base"]};
    }
  }
`;
