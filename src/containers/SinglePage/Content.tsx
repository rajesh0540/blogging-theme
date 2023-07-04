import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

type ContentProps = {
  page: any;
};

const Content: React.FC<ContentProps> = ({ page }) => {
  const { content } = page;

  return (
    <section>
      <Wrapper size="extra-small">
        <article
          className="richText"
          dangerouslySetInnerHTML={{ __html: content.rendered }}
        ></article>
      </Wrapper>
    </section>
  );
};

export default Content;
