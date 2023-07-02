import React from "react";
import Link from "next/link";

// Components
import Category from "@/common/components/Category";
import PostImage from "@/common/components/PostImage";

interface PostProps {
  index?: number;
  post: any;
  loading?: "lazy" | "eager";
  imageWidth?: number;
}

const Post1: React.FC<PostProps> = ({
  index,
  post,
  loading = "lazy",
  imageWidth = 363,
}) => {
  const { title, featured_media, slug, category, date } = post;

  return (
    <article className="duration-300 group">
      <figure className="mb-3">
        <Link href={`/post/${slug}`} aria-label={`Read ${title.rendered}`}>
          <PostImage
            containerClasses="h-[160px]"
            data={{
              src: featured_media.full.src,
              height: 160,
              width: imageWidth,
              placeholder: featured_media.full.placeholder,
              alt: featured_media.alt || `${title.rendered} featured media`,
              loading,
            }}
          />
        </Link>
      </figure>

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
              className="text-lg font-bold leading-5 h-[42px] ellipsis"
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            ></h2>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Post1;
