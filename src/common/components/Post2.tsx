import React from "react";
import Link from "next/link";

// Components
import Category from "./Category";

interface PostProps {
  post: any;
  dark?: boolean;
  classes?: string;
}

const Post2: React.FC<PostProps> = ({ post, classes }) => {
  const { title, featured_media, slug, excerpt, category, date } = post;

  return (
    <div
      className={`${classes || ""} relative overflow-hidden text-white group`}
    >
      <img
        className="object-cover w-full h-full"
        src={featured_media || "/no-image.jpg"}
      />
      <Link href={`/post/${slug}`}>
        <div className="absolute bottom-0 left-0 w-full h-[600px] transition-all opacity-40 bg-gradient-black group-hover:opacity-60"></div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-5 pt-0">
        <div className="mb-2">
          <Category category={category} postedDate={date} variant="primary" />
        </div>
        <Link href={`/post/${slug}`}>
          <h2
            className="mb-3 text-4xl font-bold leading-8 lg:leading-[44px] lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h2>
        </Link>
        {excerpt.rendered && (
          <div
            className="mt-2 overflow-hidden max-h-11 text-ellipsis"
            dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Post2;
