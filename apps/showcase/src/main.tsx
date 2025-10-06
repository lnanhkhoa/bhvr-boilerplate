import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { Toaster } from "@repo/ui/components/shadcn/sonner";
import App from "./App";

import "./styles/globals.css";
import { LayoutProvider } from "./hooks/use-layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutProvider defaultLayout="full">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <App />
            <Toaster position="top-center" />
          </BrowserRouter>
        </ThemeProvider>
      </LayoutProvider>
    </Suspense>
  </StrictMode>,
);
