import rss from "@astrojs/rss";

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPost = await getCollection("blog");

  return rss({
    // stylesheet: "/styles/rss.xsl",<

    title: "Un blog realizado con Astro",

    description: "Mis aventuras con Astro",
    site: site ?? "",
    items: blogPost.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${slug}`,
    })),
    customData: `<language>es-ES</language>`,
  });
};
