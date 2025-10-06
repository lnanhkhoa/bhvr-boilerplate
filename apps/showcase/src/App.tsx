import { Routes, Route, Navigate } from "react-router-dom";
import SinkPage from "./pages/sink/page";
import { cn } from "@repo/ui/lib/utils";

function App() {
  return (
    <main
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
        )}
      >
    <Routes>
      <Route path="/" element={<SinkPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </main>
  );
}

export default App;
