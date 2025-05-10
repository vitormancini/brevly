import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { RedirectLayout } from "./layouts/RedirectLayout";
import { Home } from "./pages/Home";
import { Redirect } from "./pages/Redirect";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<RedirectLayout />}>
        <Route path=":shortLink" element={<Redirect />} />
      </Route>
    </Routes>
  );
}
