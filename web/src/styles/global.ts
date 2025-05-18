import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        background-color: ${(props) => props.theme["gray-200"]};
        -webkit-font-smoothing: antialiased;
        width: 100vw;
        padding: 0 0.625rem;
        overflow-x: hidden;
    }

    body, input, textarea, button {
        font: ${(props) => props.theme["text-md"]};
    }
`;
