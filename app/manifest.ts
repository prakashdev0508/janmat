import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JannMat",
    short_name: "JannMat",
    description: "The real-time pulse of Indian democracy.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0d9488",
    lang: "en-IN",
    orientation: "portrait-primary",
    categories: ["news", "politics", "social"],
  };
}
