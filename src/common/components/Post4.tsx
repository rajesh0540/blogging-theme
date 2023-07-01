import React from "react";
import Link from "next/link";

// Components
import Category from "./Category";

type Post4Props = {
  post: any;
};

const Post4: React.FC<Post4Props> = ({ post }) => {
  const { title, category, thumbnail, excerpt, slug, date } = post;

  return (
    <div className="flex border-t border-gray-300">
      <div className="w-[40%] h-[228px] ">
        <Link href={`/post/${slug}`}>
          <img
            src={thumbnail || "/no-image.jpg"}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="flex-1 pt-4 pl-4 lg:pt-8 lg:pl-8">
        <div className="mb-1">
          <Category category={category} postedDate={date} />
        </div>
        <Link href={`/post/${slug}`}>
          <h2 className="mb-2 text-xl font-bold leading-7 lg:mb-4 lg:text-3xl">
            {title.rendered}
          </h2>
        </Link>
        <div
          className="overflow-hidden lg:text-lg max-h-24 lg:max-h-20 text-ellipsis"
          dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
        ></div>
      </div>
    </div>
  );
};

export default Post4;
