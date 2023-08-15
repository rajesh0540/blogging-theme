import { NextApiHandler } from "next";

import { sitemap_index } from "@/utils/functions/sitemap";

const handler: NextApiHandler = async (req, res) => {
  const sitemap = await sitemap_index();

  res.setHeader("Content-Type", "application/xml");

  return res.send(sitemap);
};

export default handler;
