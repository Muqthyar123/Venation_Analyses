import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: center ? "text-center max-w-3xl mx-auto" : "max-w-3xl", children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base text-muted-foreground sm:text-lg", children: subtitle })
  ] });
}
export {
  SectionHeader as S
};
