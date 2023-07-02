import { NextApiHandler } from "next";

//
import { sitemap as _sitemap } from "@/utils/functions/sitemap";

const handler: NextApiHandler = async (req, res) => {
  const fileName = req.query.fileName as string;

  if (!fileName) {
    res.send("");
  }

  const sitemap = await _sitemap(fileName);

  return res.send(sitemap);
};

export default handler;
