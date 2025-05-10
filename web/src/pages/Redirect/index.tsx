import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LogoIcon from "../../assets/Logo_Icon.png";
import { api } from "../../lib/axios";
import { RedirectContainer, StyledLink } from "./style";

type RouteParams = {
  shortLink: string;
};

export function Redirect() {
  const { shortLink } = useParams<RouteParams>();

  async function fetchLinkById() {
    const result = await api.get(`/links/${shortLink}`);
    console.log(result.data);
  }

  useEffect(() => {
    fetchLinkById();
  }, []);

  return (
    <RedirectContainer>
      <img src={LogoIcon} alt="Logo da aplicação" />
      <h1>Redirecionando...</h1>
      <div>
        <p>O link será aberto automaticamente em alguns instantes. </p>
        <p>
          Não foi redirecionado? <StyledLink to="#">Acesse aqui</StyledLink>
        </p>
      </div>
    </RedirectContainer>
  );
}
