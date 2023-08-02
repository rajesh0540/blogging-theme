import React from "react";
import Link from "next/link";

// Components
import Category from "@/common/components/Category";
import PostImage from "@/common/components/PostImage";

type Post4Props = {
  post: any;
  imageWidth?: number;
  loading?: "lazy" | "eager";
};

const Post4: React.FC<Post4Props> = ({
  post,
  imageWidth = 377,
  loading = "lazy",
}) => {
  const { title, category, featured_media, excerpt, slug, date } = post;

  return (
    <article className="flex border-t border-gray-300">
      <figure className="w-[40%]">
        <Link href={`/${slug}`} aria-label={`Read ${title.rendered}`}>
          <PostImage
            containerClasses="h-[228px]"
            data={{
              src: featured_media.full.src,
              height: 228,
              width: imageWidth,
              placeholder: featured_media.full.placeholder,
              alt: featured_media.alt,
              loading,
            }}
          />
        </Link>
      </figure>
      <div className="flex-1 pt-9 pl-9 lg:pt-8 lg:pl-8">
        <div className="mb-1">
          <Category category={category} postedDate={date} />
        </div>
        <Link href={`/${slug}`}>
          <h2
            className="mb-2 text-xl font-bold leading-7 lg:mb-4 lg:text-3xl ellipsis"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h2>
        </Link>
        <div
          className="overflow-hidden lg:text-lg max-h-24 lg:max-h-20 ellipsis-3"
          dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
        ></div>
      </div>
    </article>
  );
};

export default Post4;
