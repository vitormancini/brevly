import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Section } from "../../components/Section";
import { ToastMessage } from "../../components/ToastMessage";
import { useLinks } from "../../context/LinkContext";
import { api } from "../../lib/axios";
import { ExportButton, HomeContainer, LinksListContainer } from "./style";

const newLinkFormValidationSchema = z.object({
  link: z.string().trim().url("Informe uma URL válida"),
  shortLink: z
    .string()
    .min(5, "Informe uma URL minúscula e sem espaço/caractere especial"),
});

type NewLinkFormData = z.infer<typeof newLinkFormValidationSchema>;

export function Home() {
  const { links, fetchLinks } = useLinks();

  const [toast, setToast] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
  } | null>(null);

  const { register, handleSubmit, formState, reset } = useForm<NewLinkFormData>(
    {
      resolver: zodResolver(newLinkFormValidationSchema),
      defaultValues: {
        link: "",
        shortLink: "",
      },
    }
  );

  async function handleCreateNewLink(data: NewLinkFormData) {
    await api.post("/links", {
      link: data.link,
      shortLink: data.shortLink,
    });

    reset();

    await fetchLinks();
  }

  async function exportCSV() {
    try {
      const result = await api.post("/links/export");
      const { reportUrl } = result.data;

      const link = document.createElement("a");
      link.href = reportUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setToast({
        type: "error",
        title: "Erro",
        message: "Ocorreu um erro ao exportar CSV",
      });
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <HomeContainer>
      <Section title="Novo link" variant="form">
        <form onSubmit={handleSubmit(handleCreateNewLink)}>
          <Input
            label="LINK ORIGINAL"
            placeholder="www.exemplo.com"
            error={formState.errors.link?.message}
            {...register("link")}
          />
          <Input
            label="LINK ENCURTADO"
            placeholder="brev.ly/"
            error={formState.errors.shortLink?.message}
            {...register("shortLink")}
          />
          <button type="submit">Salvar link</button>
        </form>
      </Section>

      <Section title="Meus links" variant="list">
        <LinksListContainer>
          <ExportButton type="button" onClick={exportCSV}>
            <DownloadSimple />
            Baixar CSV
          </ExportButton>
          <div>
            {links.map((link) => (
              <Link
                key={link.id}
                id={link.id}
                link={link.link}
                shortLink={link.shortLink}
                accessCount={link.accessCount}
                onModified={fetchLinks}
              />
            ))}
          </div>
        </LinksListContainer>
      </Section>

      {toast && (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </HomeContainer>
  );
}
