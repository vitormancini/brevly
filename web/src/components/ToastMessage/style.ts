// ToastMessage.styles.ts
import styled, { css } from "styled-components";

export type ToastType = "success" | "error" | "info";

interface ToastContainerProps {
  type: ToastType;
}

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  animation: fadeInOut 3s forwards;
  z-index: 9999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font: ${(props) => props.theme["text-md"]};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  ${({ type }) =>
    type === "success" &&
    css`
      background-color: white;
      color: #00b894;
    `}
  ${({ type }) =>
    type === "error" &&
    css`
      background-color: white;
      color: ${(props) => props.theme["danger"]};
    `}
  ${({ type }) =>
    type === "info" &&
    css`
      background-color: white;
      color: ${(props) => props.theme["blue-dark"]};
    `}

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;
