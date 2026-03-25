import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  singletons: {
    hero: singleton({
      label: "Hero",
      path: "src/content/hero",
      schema: {
        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle", multiline: true }),
        ctaText: fields.text({ label: "CTA Button Text" }),
      },
    }),
    footer: singleton({
      label: "Footer",
      path: "src/content/footer",
      schema: {
        description: fields.text({ label: "Description", multiline: true }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Phone" }),
        location: fields.text({ label: "Location" }),
      },
    }),
  },
});
