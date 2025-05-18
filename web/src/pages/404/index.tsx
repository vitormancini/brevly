import Icon from "../../assets/404.png";
import { NotFoundContainer } from "./style";

export function NotFound() {
  return (
    <NotFoundContainer>
      <img src={Icon} alt="404" />
      <h1>Link não encontrado</h1>
      <p>
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em brev.ly.
      </p>
    </NotFoundContainer>
  );
}
