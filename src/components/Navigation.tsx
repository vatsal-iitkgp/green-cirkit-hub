import { useEffect, useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-green-600 to-emerald-400 grid place-items-center">
              <Leaf className="h-4 w-4 text-white" />
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
            <Link to="/contact">
              <Button size="sm" className="ml-2">
                Get Quote
              </Button>
            </Link>
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
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full">Get Quote</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
