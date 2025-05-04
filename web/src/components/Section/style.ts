import styled from "styled-components";

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${(props) => props.theme["gray-100"]};
  padding: 1.5rem;

  h2 {
    font: ${(props) => props.theme["text-lg"]};
    margin-bottom: 1rem;
  }
`;
