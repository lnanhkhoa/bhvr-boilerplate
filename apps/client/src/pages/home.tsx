import { useEffect } from "react";
import beaver from "@/assets/beaver.svg";
import { Button } from "@repo/ui/components/shadcn/button";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/configs/constanst";

export default function HomePage() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      navigate(ROUTES.dashboard);
    }
  }, [session, navigate]);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6">
      <a href="https://github.com/stevedylandev/bhvr" target="_blank" rel="noopener">
        <img src={beaver} className="h-16 w-16 cursor-pointer" alt="beaver logo" />
      </a>
      <h1 className="text-5xl font-black">bhvr</h1>
      <h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => window.open("https://bhvr.dev", "_blank")}>
          Docs
        </Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.login)}>
          Login
        </Button>
      </div>
    </div>
  );
}
