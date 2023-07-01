import React, { useState } from "react";

import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";

// Components
import Wrapper from "@/common/components/Wrapper";
import PostSubHeading from "@/common/containers/PostSubHeading";
import Image from "@/common/components/Image";

import CommentForm, {
  CommentSubmitHandler,
} from "@/common/components/CommentForm";

//
import { getHumanReadableTime } from "@/utils/functions/date";

type CommentProps = {
  post: any;
};

const Comment: React.FC<CommentProps> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { comments } = post;

  const commentHandler: CommentSubmitHandler = async (comment) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/comment",
        {
          ...comment,
          postId: post.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      const { message } = response.data;

      Swal.fire("", message, "success");
    } catch (e) {}

    setLoading(false);
  };

  return (
    <section className="mb-[90px]">
      <Wrapper size="small">
        <div className="mb-6">
          <PostSubHeading> Leave a Comment </PostSubHeading>
          <CommentForm loading={loading} onSubmit={commentHandler} />
        </div>

        <div className="mt-10 bg-gray-50 p-[20px]">
          <ul>
            {comments.map((comment: any) => (
              <li>
                <div>
                  <div className="block gap-7 lg:flex">
                    <div>
                      <Link href="/">
                        <Image
                          classes="rounded-full h-[40px] w-[40px] mb-[28px] lg:mb-0"
                          src={comment.author_avatar}
                        />
                      </Link>
                    </div>
                    <div className="lg:flex-1">
                      <h3 className="mb-1 text-[22px]">
                        {comment.author_name}
                      </h3>
                      <span className="text-gray-400">
                        {getHumanReadableTime(comment.date)}
                      </span>

                      <div
                        className="text-gray-700 my-7"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      ></div>
                    </div>
                  </div>
                  <a href={comment.author_url}></a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </section>
  );
};

export default Comment;
