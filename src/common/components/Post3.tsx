import React from "react";
import Link from "next/link";

// Components
import Image from "./Image";
import Category from "./Category";

interface PostProps {
  post: any;
  dark?: boolean;
  headingClasses?: string;
  imageClasses?: string;
}

const Post3: React.FC<PostProps> = ({
  post,
  dark,
  imageClasses = "h-20 w-20",
  headingClasses = "font-bold leading-5 text-lg",
}) => {
  const { title, thumbnail, slug, category, date } = post;

  return (
    <div className="flex">
      <Link href={`/post/${slug}`}>
        <Image
          classes={`${imageClasses} mr-3`}
          src={thumbnail || "/no-image.jpg"}
        />
      </Link>

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
            className={`${headingClasses} ${dark ? "text-gray-300" : ""}`}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h2>
        </Link>
      </div>
    </div>
  );
};

export default Post3;
