import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VenaLeaf AI" },
      { name: "description", content: "Get in touch with the research team behind VenaLeaf AI." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Get in Touch</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Questions about the research, collaborations, or interested in our IEEE paper? Reach out.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold">Project Information</h3>
          {[
            { icon: Mail, label: "Email", value: "research@venaleaf.ai" },
            { icon: MapPin, label: "Institution", value: "Department of CSE — Final Year Project" },
            { icon: Github, label: "GitHub", value: "github.com/venaleaf-ai" },
            { icon: Linkedin, label: "LinkedIn", value: "VenaLeaf Research" },
          ].map((i) => (
            <div key={i.label} className="flex gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary shadow-glow">
                <i.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">
                  {i.label}
                </p>
                <p className="font-medium mt-0.5">{i.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="glass rounded-3xl p-8 space-y-4"
        >
          <h3 className="text-xl font-bold mb-2">Send a Message</h3>
          <input
            required
            placeholder="Your name"
            className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
          <textarea
            required
            rows={5}
            placeholder="Your message..."
            className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
          />
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
          >
            <Send className="h-4 w-4" />
            {sent ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
