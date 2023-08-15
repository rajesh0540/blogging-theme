import * as htmlparser2 from "htmlparser2";

//
import Wordpress from "@/services/Wordpress";

const wpUrl = process.env.WORDPRESS_URL;
const hostedUrl = process.env.HOSTED_URL;

export const sitemap_index = async () => {
  const sitemap = await Wordpress.getIndexSitemap();

  const sitemapData = [
    {
      fileName: "post-sitemap.xml",
      lastModified: "",
    },
    {
      fileName: "page-sitemap.xml",
      lastModified: "",
    },
    {
      fileName: "category-sitemap.xml",
      lastModified: "",
    },
    {
      fileName: "post_tag-sitemap.xml",
      lastModified: "",
    },
    {
      fileName: "author-sitemap.xml",
      lastModified: "",
    },
    {
      fileName: "web-story-sitemap.xml",
    },
  ];

  const document = htmlparser2.parseDocument(sitemap, {
    decodeEntities: true,
    recognizeSelfClosing: true,
  });

  const siteMapListing: any = document.children.find(
    (child: any) => child.name === "sitemapindex"
  );
  siteMapListing.children.forEach((child: any) => {
    if (child.name !== "sitemap") {
      return;
    }

    const loc = child.children.find((child: any) => child.name === "loc")
      .firstChild.data;
    const lastmod = child.children.find(
      (child: any) => child.name === "lastmod"
    ).firstChild.data;

    const sitemap = sitemapData.find((data) => loc.endsWith(data.fileName));

    if (sitemap) {
      sitemap.lastModified = lastmod;
    }
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapData
      .map((sitemap) => {
        return `<sitemap>
        <loc>${hostedUrl}/sitemap/${sitemap.fileName}</loc>
        <lastmod>${sitemap.lastModified}</lastmod>
    </sitemap>`;
      })
      .join("\n    ")}
</sitemapindex>`;
};

export const sitemap_news = async () => {
  const { name } = await Wordpress.getSiteData();
  const posts = await Wordpress.getAllPosts(99);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts
    .map((post: any) => {
      const date = new Date(post.date);

      return `<url>
    <loc>${hostedUrl}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${formatDateToYYYYMMDD(
        date
      )}</news:publication_date>
      <news:title>${post.title.rendered}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n  ")}
</urlset>`;
};

export const sitemap = async (fileName: string, locationPrefix = "") => {
  const sitemapString = await Wordpress.getSitemap(fileName);

  const document = htmlparser2.parseDocument(sitemapString, {
    decodeEntities: true,
    recognizeSelfClosing: true,
  });

  const urls: any[] = [];

  const urlListing: any = document.children.find(
    (child: any) => child.name === "urlset"
  );
  urlListing.children.forEach((child: any) => {
    if (child.name !== "url") return;

    const loc = child.children.find((child: any) => child.name === "loc")
      .firstChild.data;

    const lastmod =
      child.children.find((child: any) => child.name === "lastmod")?.firstChild
        ?.data || "";

    urls.push({
      loc: loc
        .replace(wpUrl, hostedUrl + locationPrefix)
        .replace("/post/category", "/category")
        .replace("/post/tag", "/tag")
        .replace("/post/author", "/author"),
      lastmod,
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `<url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    
  </url>`
    )
    .join("\n  ")}
</urlset>`;
};

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
