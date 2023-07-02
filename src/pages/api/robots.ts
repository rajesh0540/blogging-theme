import { NextApiHandler } from "next";

const hostedUrl = process.env.HOSTED_URL;

const handler: NextApiHandler = (req, res) => {
  return res.send(`User-agent: *
Disallow:

Sitemap: ${hostedUrl}/sitemap_index.xml`);
};

export default handler;
