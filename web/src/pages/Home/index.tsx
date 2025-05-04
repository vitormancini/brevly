import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { HomeContainer } from "./style";

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

      <Section title="Meus links"></Section>
    </HomeContainer>
  );
}
