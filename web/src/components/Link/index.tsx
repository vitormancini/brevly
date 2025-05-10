import { Copy, Trash } from "phosphor-react";
import { api } from "../../lib/axios";
import {
  ActionButtonContainer,
  LinkArea,
  LinkContainer,
  StyledLink,
} from "./style";

interface LinkProps {
  id: string;
  link: string;
  shortLink: string;
  accessCount: number;
  onDelete: () => void;
}

export function Link({
  id,
  link,
  shortLink,
  accessCount,
  onDelete,
}: LinkProps) {
  async function handleDeleteLink(linkId: string) {
    await api.delete(`/links/${linkId}`);
    onDelete();
  }

  function handleCopyLink(link: string) {
    navigator.clipboard.writeText(link);
  }

  return (
    <LinkContainer>
      <LinkArea>
        <StyledLink to={shortLink} target="_blank">
          {shortLink}
        </StyledLink>
        <span>{link}</span>
      </LinkArea>

      <ActionButtonContainer>
        <span>{accessCount} acessos</span>
        <button type="button" onClick={() => handleCopyLink(link)}>
          <Copy />
        </button>
        <button type="button" onClick={() => handleDeleteLink(id)}>
          <Trash />
        </button>
      </ActionButtonContainer>
    </LinkContainer>
  );
}
