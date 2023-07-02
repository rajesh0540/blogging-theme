import { NextApiHandler } from "next";

import Wordpress from "@/services/Wordpress";

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string;

  const response = await Wordpress.getWebStoryBySlug(slug);

  if (response) {
    return res.send(response.content.rendered);
  } else {
    return res.status(404).send("Not found");
  }
};

export default handler;
