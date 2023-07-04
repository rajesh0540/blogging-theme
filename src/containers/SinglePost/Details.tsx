import React from "react";
import Link from "next/link";

// Components
import Wrapper from "@/common/components/Wrapper";
import SocialIcons from "@/common/components/SocialIcons";

//
import { getHumanReadableTime } from "@/utils/functions/date";

type DetailsProps = {
  post: any;
};

const hostedUrl = process.env.HOSTED_URL || "";

const Details: React.FC<DetailsProps> = ({ post }) => {
  const { title, category, author, date } = post;

  return (
    <section>
      {category && (
        <Link href={`/category/${category.slug}`}>
          <span className="block text-lg font-medium uppercase text-primary">
            {category.name}
          </span>
        </Link>
      )}
      <h1
        className="mb-6 text-5xl font-bold"
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      ></h1>
      <div className="flex justify-between">
        <div>
          <Link href={`/author/${author.slug}`}>
            <span className="block font-medium text-gray-500 uppercase ">
              {author.name}
            </span>
          </Link>
          <span className="text-gray-500">{getHumanReadableTime(date)}</span>
        </div>
        <div>
          <SocialIcons
            title={title.rendered}
            url={`${hostedUrl}/${post.slug}`}
          />
        </div>
      </div>
      <div className="my-6 h-[1px] bg-gray-300"></div>
    </section>
  );
};

export default Details;
