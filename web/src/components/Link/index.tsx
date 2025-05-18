import { Copy, Trash } from "phosphor-react";
import { useState } from "react";
import { api } from "../../lib/axios";
import { ToastMessage } from "../ToastMessage";
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
  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  async function handleDeleteLink(linkId: string) {
    const confirmation = window.confirm(
      "Tem certeza que deseja excluir esse link?"
    );

    if (confirmation) {
      await api.delete(`/links/${linkId}`);
      onModified();
    }
  }

  function handleCopyLink(link: string) {
    setToast({
      type: "info",
      title: "Link copiado com sucesso",
      message: "O link foi copiado para a area de transferencia",
    });
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
          to={`/url/${shortLink}`}
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

      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </LinkContainer>
  );
}
