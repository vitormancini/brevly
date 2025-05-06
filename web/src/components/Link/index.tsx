import { Copy, Trash } from "phosphor-react";
import { ActionButtonContainer, LinkArea, LinkContainer } from "./style";

interface LinkProps {
  link: string;
  shortLink: string;
  accessCount: number;
}

export function Link({ link, shortLink, accessCount }: LinkProps) {
  return (
    <LinkContainer>
      <LinkArea>
        <h3>{link}</h3>
        <span>{shortLink}</span>
      </LinkArea>

      <ActionButtonContainer>
        <span>{accessCount} acessos</span>
        <button type="button">
          <Copy />
        </button>
        <button type="button">
          <Trash />
        </button>
      </ActionButtonContainer>
    </LinkContainer>
  );
}
