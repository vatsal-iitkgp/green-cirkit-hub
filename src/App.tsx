import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Granules from "./pages/HDPEGranules";
import SellScrap from "./pages/SellScrap";
import NotFound from "./pages/NotFound";
import GigiChatbot from "./components/GigiChatbot";
import { Cursor, Footer, Intro, Nav, ScrollManager } from "./components/site/Chrome";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
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
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
