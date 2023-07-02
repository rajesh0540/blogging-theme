import { NextApiHandler } from "next";

//
import { blogFeed } from "@/utils/functions/feed";

const handler: NextApiHandler = async (req, res) => {
  try {
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Type", "application/xml");

    const feed = await blogFeed();

    return res.send(feed);
  } catch (e) {
    return res.send("");
  }
};

export default handler;
