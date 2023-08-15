import { NextApiHandler } from "next";

//
import { sitemap as _sitemap } from "@/utils/functions/sitemap";

const handler: NextApiHandler = async (req, res) => {
  const fileName = req.query.fileName as string;

  if (!fileName) {
    res.send("");
  }

  let locationPrefix = "";

  if (fileName === "page-sitemap.xml") {
    locationPrefix = "/page";
  }

  const sitemap = await _sitemap(fileName, locationPrefix);

  res.setHeader("Content-Type", "application/xml");

  return res.send(sitemap);
};

export default handler;
