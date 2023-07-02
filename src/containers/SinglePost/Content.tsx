import React from "react";
import Image from "next/image";

// Components
import SocialIcons from "@/common/components/SocialIcons";

type ContentProps = {
  post: any;
};

const hostedUrl = process.env.HOSTED_URL || "";

const Content: React.FC<ContentProps> = ({ post }) => {
  const { title, content, featured_media } = post;

  return (
    <section className="mb-8">
      {featured_media ? (
        <figure className="flex flex-col items-center mb-8">
          <Image
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
      <div>
        <h3 className="mb-3 text-xl">Share on social media</h3>
        <SocialIcons
          title={title.rendered}
          url={`${hostedUrl}/post/${post.slug}`}
        />
      </div>
    </section>
  );
};

export default Content;
