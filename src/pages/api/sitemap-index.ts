import { NextApiHandler } from "next";

import { sitemap_index } from "@/utils/functions/sitemap";

const handler: NextApiHandler = async (req, res) => {
  const sitemap = await sitemap_index();

  return res.send(sitemap);
};

export default handler;
