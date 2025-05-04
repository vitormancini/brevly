import { Outlet } from "react-router-dom";
import LogoImage from "../../assets/Logo.png";
import { LayoutContainer, Logo } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Logo src={LogoImage} />
      <Outlet />
    </LayoutContainer>
  );
}
