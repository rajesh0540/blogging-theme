import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import Category from "@/common/components/Category";

interface PostProps {
  post: any;
  dark?: boolean;
  classes?: string;
  imageHeight?: number;
  imageWidth?: number;
  loading?: "lazy" | "eager";
}

const Post2: React.FC<PostProps> = ({
  post,
  classes,
  imageHeight = 600,
  imageWidth = 554,
  loading = "lazy",
}) => {
  const { title, featured_media, slug, excerpt, category, date } = post;

  return (
    <article
      className={`${classes || ""} relative overflow-hidden text-white group`}
    >
      <Image
        className="object-cover w-full h-full"
        src={featured_media.full.src}
        alt={featured_media.alt}
        height={imageHeight}
        width={imageWidth}
        {...(featured_media.full.placeholder
          ? {
              placeholder: "blur",
              blurDataURL: featured_media.full.placeholder,
            }
          : {})}
        loading={loading}
      />
      <Link href={`/post/${slug}`} aria-label={`Read ${title.rendered}`}>
        <div className="absolute bottom-0 left-0 w-full h-[600px] transition-all opacity-40 bg-gradient-black group-hover:opacity-60"></div>
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-5 pt-0">
        <div className="mb-2">
          <Category category={category} postedDate={date} variant="primary" />
        </div>
        <Link href={`/post/${slug}`}>
          <h2
            className="mb-3 text-4xl font-bold leading-8 lg:leading-[48px] lg:text-5xl pb-[6px] ellipsis-3"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h2>
        </Link>
        {excerpt.rendered && (
          <div
            className="mt-2 overflow-hidden max-h-12 ellipsis"
            dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
          ></div>
        )}
      </div>
    </article>
  );
};

export default Post2;
