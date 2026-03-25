import { config, fields, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: "VovaMelnyk/next-test-goit",
        branchPrefix: "keystatic-landing-b/",
      }
    : { kind: "local" },
  singletons: {
    hero: singleton({
      label: "Hero",
      path: "src/content/hero",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle", multiline: true }),
        ctaText: fields.text({ label: "CTA Button Text" }),
      },
    }),
    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
      format: { data: "json" },
      schema: {
        description: fields.text({ label: "Description", multiline: true }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Phone" }),
        location: fields.text({ label: "Location" }),
      },
    }),
  },
});
