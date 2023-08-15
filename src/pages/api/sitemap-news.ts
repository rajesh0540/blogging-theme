import { NextApiHandler } from "next";

import { sitemap_news } from "@/utils/functions/sitemap";

const handler: NextApiHandler = async (req, res) => {
  const sitemap = await sitemap_news();

  res.setHeader("Content-Type", "application/xml");

  return res.send(sitemap);
};

export default handler;
