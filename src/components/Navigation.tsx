import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/greencirkit-logo.jpg";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import QuoteModal from "@/components/QuoteModal";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "HDPE Granules", to: "/granules/buy" },
    { name: "EPR Credits", to: "/epr" },
    { name: "About", to: "/about" },
  ];

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 border-b",
        "backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/70",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md overflow-hidden bg-white/10 backdrop-blur border border-white/20">
              <img 
                src={logoImage} 
                alt="GreenCirkit Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-base md:text-lg font-semibold">
              GreenCirkit
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Button size="sm" className="ml-2" onClick={() => setQuoteModalOpen(true)}>
              Get Quote
            </Button>
          </nav>

          {/* Mobile button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="rounded-xl border bg-card p-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "block px-3 py-2 rounded-lg text-sm font-medium",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Button 
                className="w-full" 
                onClick={() => {
                  setOpen(false);
                  setQuoteModalOpen(true);
                }}
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
      />
    </header>
  );
};

export default Navigation;
