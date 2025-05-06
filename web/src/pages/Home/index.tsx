import { DownloadSimple } from "phosphor-react";
import { Input } from "../../components/Input";
import { Link } from "../../components/Link";
import { Section } from "../../components/Section";
import { ExportButton, HomeContainer, LinksListContainer } from "./style";

export function Home() {
  return (
    <HomeContainer>
      <Section title="Novo link">
        <form>
          <Input label="LINK ORIGINAL" placeholder="www.exemplo.com" />
          <Input label="LINK ENCURTADO" placeholder="brev.ly/" />
          <button type="submit">Salvar link</button>
        </form>
      </Section>

      <Section title="Meus links">
        <LinksListContainer>
          <ExportButton type="button">
            <DownloadSimple />
            Baixar CSV
          </ExportButton>
          <div>
            <Link
              link="brev.ly/google"
              shortLink="https://google.com"
              accessCount={10}
            />
            <Link
              link="brev.ly/google"
              shortLink="https://google.com"
              accessCount={10}
            />
            <Link
              link="brev.ly/google"
              shortLink="https://google.com"
              accessCount={10}
            />
          </div>
        </LinksListContainer>
      </Section>
    </HomeContainer>
  );
}
