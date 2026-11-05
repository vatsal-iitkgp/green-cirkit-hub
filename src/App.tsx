import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Granules from "./pages/HDPEGranules";
import SellScrap from "./pages/SellScrap";
import NotFound from "./pages/NotFound";
import TDS from "./pages/TDS";
import GigiChatbot from "./components/GigiChatbot";
import { Cursor, Footer, Intro, Nav, ScrollManager } from "./components/site/Chrome";

const Site = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/tds"))
    return (
      <Routes>
        <Route path="/tds/:id" element={<TDS />} />
      </Routes>
    );
  return (
    <div className="grain">
      <Intro />
      <Cursor />
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/granules" element={<Granules />} />
        <Route path="/sell-scrap" element={<SellScrap />} />
        {/* old URLs */}
        <Route path="/granules/buy" element={<Navigate to="/granules" replace />} />
        <Route path="/epr" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <GigiChatbot />
    </div>
  );
};

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
