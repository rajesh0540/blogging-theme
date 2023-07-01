import React from "react";
import Link from "next/link";

// Components
import Image from "./Image";
import Category from "./Category";

interface PostProps {
  index?: number;
  post: any;
}

const Post1: React.FC<PostProps> = ({ index, post }) => {
  const { title, thumbnail, slug, category, date } = post;

  return (
    <div className="duration-300 group">
      <Link href={`/post/${slug}`}>
        <Image classes="h-[145px] mb-3" src={thumbnail || "/no-image.jpg"} />
      </Link>

      <div className="flex mb-1 transition-opacity group-hover:opacity-70">
        {index && <div className="w-11"></div>}
        <Category category={category} postedDate={date} />
      </div>
      <div className="flex transition-opacity group-hover:opacity-70">
        {index && (
          <div className="flex items-center justify-center w-10 mr-1 h-10 text-[40px] font-bold text-gray-300">
            {index}
          </div>
        )}
        <div className="flex-1 ">
          <Link href={`/post/${slug}`}>
            <h2
              className="text-lg font-bold leading-5"
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            ></h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post1;
