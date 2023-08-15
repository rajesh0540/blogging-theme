import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import SocialIcons from "@/common/components/SocialIcons";

type ContentProps = {
  post: any;
};

const hostedUrl = process.env.HOSTED_URL || "";

const Content: React.FC<ContentProps> = ({ post }) => {
  const { title, content, featured_media, tags } = post;

  return (
    <section className="mb-8">
      {featured_media ? (
        <figure className="flex flex-col items-center mb-8">
          <Image
            id="primaryimage"
            src={featured_media.full.src}
            alt={featured_media.alt || `${title.rendered} featured media`}
            width={760}
            height={featured_media.full.height}
            {...(featured_media.full.placeholder
              ? {
                  blurDataURL: featured_media.full.placeholder,
                  placeholder: "blur",
                }
              : {})}
            loading="eager"
          />
          {featured_media.caption && (
            <figcaption
              className="mt-2 text-sm italic text-gray-600"
              dangerouslySetInnerHTML={{ __html: featured_media.caption }}
            ></figcaption>
          )}
        </figure>
      ) : null}
      <article
        className="mb-8 richText"
        dangerouslySetInnerHTML={{ __html: content.rendered }}
      ></article>
      <div className="flex mb-8 text-sm font-medium uppercase">
        <span className="mr-3 text-gray-800">Related Topics:</span>
        <ul className="flex gap-2">
          {tags.map((tag: any) => (
            <li>
              <Link className="text-gray-600" href={`/tag/${tag.slug}`}>
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-xl">Share on social media</h3>
        <SocialIcons title={title.rendered} url={`${hostedUrl}/${post.slug}`} />
      </div>
    </section>
  );
};

export default Content;
