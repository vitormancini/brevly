import { Outlet } from "react-router-dom";
import { RedirectLayoutContainer } from "./style";

export function RedirectLayout() {
  return (
    <RedirectLayoutContainer>
      <Outlet />
    </RedirectLayoutContainer>
  );
}
