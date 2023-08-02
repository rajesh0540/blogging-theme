import { NextApiHandler } from "next";

const hostedUrl = process.env.HOSTED_URL;

const handler: NextApiHandler = (req, res) => {
  return res.send(`User-agent: *
Disallow:

Sitemap: ${hostedUrl}/sitemap_index.xml
Sitemap: https://timesin.com/news_sitemap.xml
Sitemap: https://timesin.com/
Sitemap: https://timesin.com/category
Sitemap: https://timesin.com/tag
Sitemap: https://timesin.com/author
Sitemap: https://timesin.com/page`);
};

export default handler;
