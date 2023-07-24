import React from "react";
import Link from "next/link";
import NextImage from "next/image";

// Components
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
        className="mb-6 text-3xl font-bold"
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      ></h1>
      <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex items-center gap-2">
          <Link href={`/author/${author.slug}`} aria-label={author.name}>
            <div className="w-16 h-16 overflow-hidden border rounded-full border-slate-100">
              <NextImage
                className="object-cover w-full h-full"
                src={author.avatar_urls[96]}
                alt={author.name}
                height={62}
                width={62}
              />
            </div>
          </Link>

          <div>
            <Link href={`/author/${author.slug}`}>
              <span className="block font-medium text-gray-500 uppercase ">
                {author.name}
              </span>
            </Link>
            <span className="text-gray-500">{getHumanReadableTime(date)}</span>
          </div>
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
