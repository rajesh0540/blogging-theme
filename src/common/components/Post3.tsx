import React from "react";
import Link from "next/link";

// Components
import PostImage from "@/common/components/PostImage";
import Category from "@/common/components/Category";

interface PostProps {
  post: any;
  dark?: boolean;
  headingClasses?: string;
  imageClasses?: string;
  loading?: "lazy" | "eager";
}

const Post3: React.FC<PostProps> = ({
  post,
  dark,
  imageClasses = "h-20 w-20",
  headingClasses = "font-bold leading-5 text-lg",
  loading = "lazy",
}) => {
  const { title, featured_media, slug, category, date } = post;

  return (
    <article className="flex group">
      <figure className="mr-3">
        <Link href={`/post/${slug}`} aria-label={`Read ${title.rendered}`}>
          <PostImage
            containerClasses={`${imageClasses}`}
            data={{
              src: featured_media.thumbnail.src,
              placeholder: featured_media.thumbnail.placeholder,
              height: featured_media.thumbnail.height,
              width: featured_media.thumbnail.width,
              alt: featured_media.alt,
              loading,
            }}
          />
        </Link>
      </figure>

      <div className="flex-1">
        <div className="mb-1">
          <Category
            category={category}
            variant={dark ? "primary-dark" : "gray"}
            postedDate={date}
          />
        </div>
        <Link href={`/post/${slug}`}>
          <h2
            className={`${headingClasses} ${
              dark ? "text-gray-300" : ""
            } h-[42px] ellipsis`}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h2>
        </Link>
      </div>
    </article>
  );
};

export default Post3;
