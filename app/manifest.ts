import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.firstName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#090D1C",
    theme_color: "#090D1C",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
