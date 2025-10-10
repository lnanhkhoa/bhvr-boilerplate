import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { Toaster } from "@repo/ui/components/shadcn/sonner";
import { BrowserRouter } from "react-router";
import App from "./routes/app-routes";
import "./lib/auth-client";

import "./styles/global.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Fragment>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </Fragment>,
);
