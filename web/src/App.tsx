import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { LinkProvider } from "./context/LinkContext";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LinkProvider>
          <Router />
        </LinkProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
