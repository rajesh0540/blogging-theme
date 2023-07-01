import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import SocialIcons from "@/common/components/SocialIcons";

type ContentProps = {
  post: any;
};

const Content: React.FC<ContentProps> = ({ post }) => {
  const { content, featured_media } = post;

  return (
    <section className="mb-8">
      <Wrapper size="small">
        {featured_media ? (
          <div className="flex justify-center mb-6">
            <img src={featured_media} />
          </div>
        ) : null}
        <div
          className="mb-8 richText"
          dangerouslySetInnerHTML={{ __html: content.rendered }}
        ></div>
        <div>
          <h3 className="mb-3 text-xl">Share on social media</h3>
          <SocialIcons />
        </div>
      </Wrapper>
    </section>
  );
};

export default Content;
