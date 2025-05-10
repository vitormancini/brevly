import { createContext, useContext, useState } from "react";
import { api } from "../lib/axios";

interface Link {
  id: string;
  link: string;
  shortLink: string;
  accessCount: number;
  createAt: Date;
}

interface LinkContextData {
  links: Link[];
  fetchLinks: () => Promise<void>;
}

const LinkContext = createContext({} as LinkContextData);

type childrenType = {
  children: React.ReactNode;
};

export function LinkProvider({ children }: childrenType) {
  const [links, setLinks] = useState<Link[]>([]);

  async function fetchLinks() {
    const response = await api.get("/links");
    setLinks(response.data.links);
  }

  return (
    <LinkContext.Provider value={{ links, fetchLinks }}>
      {children}
    </LinkContext.Provider>
  );
}

export const useLinks = () => useContext(LinkContext);
