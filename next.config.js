/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.WORDPRESS_URL_DOMAIN],
  },
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
      },
      {
        source: "/:slug/feed",
        destination: "/api/comment-feed",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap_index.xml",
        destination: "/api/sitemap-index",
      },
      {
        source: "/news_sitemap.xml",
        destination: "/api/sitemap-news",
      },
      {
        source: "/sitemap/:fileName",
        destination: "/api/sitemap",
      },
    ];
  },
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    WORDPRESS_JSON_URL: process.env.WORDPRESS_JSON_URL,
    HOSTED_URL: process.env.HOSTED_URL,
  },
};

module.exports = nextConfig;
