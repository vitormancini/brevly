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
  onModified: () => void;
}

const host = window.location.origin
  .replace("http://", "")
  .replace("https://", "");

export function Link({
  id,
  link,
  shortLink,
  accessCount,
  onModified,
}: LinkProps) {
  async function handleDeleteLink(linkId: string) {
    await api.delete(`/links/${linkId}`);
    onModified();
  }

  function handleCopyLink(link: string) {
    navigator.clipboard.writeText(link);
  }

  async function incrementAccessCount() {
    await api.put(`/links/${id}`);
    onModified();
  }

  return (
    <LinkContainer>
      <LinkArea>
        <StyledLink
          to={shortLink}
          target="_blank"
          onClick={incrementAccessCount}
        >
          {host}/{shortLink}
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
