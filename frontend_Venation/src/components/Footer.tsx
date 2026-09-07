import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                Vena<span className="text-gradient">Leaf</span> AI
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">IEEE Publication</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition.
              <br />
              <span className="italic">IEEE Conference on Computer Vision & AI, 2025</span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Connect</h4>
            <div className="flex gap-3">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-border transition-smooth hover:bg-accent hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} VenaLeaf AI — Final Year IEEE Research Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
