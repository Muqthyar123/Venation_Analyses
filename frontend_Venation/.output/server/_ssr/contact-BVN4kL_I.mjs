import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as Mail, j as MapPin, G as Github, b as Linkedin, k as Send } from "../_libs/lucide-react.mjs";
function Contact() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold", children: "Get in Touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: "Questions about the research, collaborations, or interested in our IEEE paper? Reach out." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Project Information" }),
        [{
          icon: Mail,
          label: "Email",
          value: "research@venaleaf.ai"
        }, {
          icon: MapPin,
          label: "Institution",
          value: "Department of CSE — Final Year Project"
        }, {
          icon: Github,
          label: "GitHub",
          value: "github.com/venaleaf-ai"
        }, {
          icon: Linkedin,
          label: "LinkedIn",
          value: "VenaLeaf Research"
        }].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(i.icon, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase text-muted-foreground tracking-wider font-semibold", children: i.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-0.5", children: i.value })
          ] })
        ] }, i.label))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3e3);
      }, className: "glass rounded-3xl p-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Send a Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Your name", className: "w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", placeholder: "Your email", className: "w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 5, placeholder: "Your message...", className: "w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          sent ? "Message Sent!" : "Send Message"
        ] })
      ] })
    ] })
  ] });
}
export {
  Contact as component
};
