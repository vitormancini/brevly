import styled, { css } from "styled-components";

interface SectionContainerProps {
  variant?: "form" | "list";
}

export const SectionContainer = styled.div<SectionContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${(props) => props.theme["gray-100"]};
  padding: 1.5rem;

  ${({ variant }) =>
    variant === "form" &&
    css`
      height: fit-content;
    `}

  ${({ variant }) =>
    variant === "list" &&
    css`
      max-height: 500px;
      overflow-y: auto;
    `}

  h2 {
    font: ${(props) => props.theme["text-lg"]};
    margin-bottom: 1rem;
  }
`;
