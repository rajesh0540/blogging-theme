import { NextApiHandler } from "next";

//
import { commentFeed } from "@/utils/functions/feed";

const handler: NextApiHandler = async (req, res) => {
  try {
    const postSlug = req.query.slug as string;

    if (!postSlug) {
      return res.send("");
    }

    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Type", "application/xml");

    const feed = await commentFeed(postSlug);

    return res.send(feed);
  } catch (e) {
    return res.send("");
  }
};

export default handler;
