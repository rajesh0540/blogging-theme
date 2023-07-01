import { NextApiHandler } from "next";
import Wordpress from "@/services/Wordpress";
import joi from "joi";

const commentSchema = joi.object().keys({
  author_name: joi.string().required(),
  author_email: joi.string().required().email(),
  author_url: joi.string().required().uri(),
  content: joi.string().required(),
  postId: joi.number().required(),
});

const { WORDRESS_USERNAME = "", WORDPRESS_PASSWORD = "" } = process.env;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const validationReponse = commentSchema.validate(req.body || {});

      if (validationReponse.error) {
        return res.status(400).json({
          message: validationReponse.error.message,
          success: false,
          payload: {},
        });
      }

      const { token } = await Wordpress.login({
        username: WORDRESS_USERNAME,
        password: WORDPRESS_PASSWORD,
      });

      const { postId, author_name, author_email, author_url, content } =
        req.body;

      await Wordpress.createComment(postId, token, {
        author_name,
        author_email,
        author_url,
        content,
      });

      return res.status(200).json({
        message: "Comment submitted successfully",
        payload: {},
        success: true,
      });
    } catch (e: any) {
      res.status(500).json({
        message: e.message,
        success: false,
        payload: {},
      });
    }
  } else {
    res.status(404).send("Route not found");
  }
};

export default handler;
