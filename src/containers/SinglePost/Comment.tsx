import React, { useState } from "react";
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
      <div className="mb-6">
        <PostSubHeading> Leave a Comment </PostSubHeading>
        <CommentForm loading={loading} onSubmit={commentHandler} />
      </div>

      {comments.length > 0 && (
        <div className="mt-10 bg-gray-50 p-[20px]" id="comments">
          <ul>
            {comments.map((comment: any) => (
              <li className="mb-6 last:mb-0" id={`comment-${comment.id}`}>
                <div className="gap-7 lg:flex">
                  <div>
                    <Image
                      classes="rounded-full h-[40px] w-[40px] mb-[28px] lg:mb-0"
                      src={comment.author_avatar}
                      alt={comment.author_name}
                    />
                  </div>
                  <div className="lg:flex-1">
                    <h3 className="mb-1 text-[22px]">{comment.author_name}</h3>
                    <span className="block mb-4 text-gray-400">
                      {getHumanReadableTime(comment.date)}
                    </span>

                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Comment;
