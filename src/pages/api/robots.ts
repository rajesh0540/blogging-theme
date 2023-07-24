import { NextApiHandler } from "next";

const hostedUrl = process.env.HOSTED_URL;

const handler: NextApiHandler = (req, res) => {
  return res.send(`User-agent: *
Disallow:

Sitemap: ${hostedUrl}/sitemap_index.xml`);
Sitemap: ${hostedUrl}/news_sitemap.xml`);
Categories: ${hostedUrl}/category`);
Tag: ${hostedUrl}/tag`);
Author: ${hostedUrl}/author`);
Page: ${hostedUrl}/page`);
};

export default handler;
