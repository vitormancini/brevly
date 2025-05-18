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

  async function fetchLink() {
    try {
      const result = await api.get(`/links/redirect/${shortLink}`);
      if (result.status === 200) {
        window.location.href = result.data.link;
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        window.location.href = "/not-found";
      }
    }
  }

  useEffect(() => {
    fetchLink();
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
