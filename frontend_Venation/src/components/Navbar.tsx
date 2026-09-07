import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { BackendStatus } from "./BackendStatus";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/single", label: "Single Prediction" },
  { to: "/multi", label: "Multi Prediction" },
  { to: "/dataset", label: "Dataset" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow transition-smooth group-hover:scale-110">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Vena<span className="text-gradient">Leaf</span> AI
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground",
                pathname === l.to && "bg-accent text-accent-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <BackendStatus />
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border transition-smooth hover:bg-accent"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border px-4 py-3 space-y-1 animate-fade-in-up">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-accent",
                pathname === l.to && "bg-accent text-accent-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
