import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Divider from "@/common/components/Divider";
import Post3 from "@/common/components/Post3";
import Post4 from "@/common/components/Post4";

type MoreNewsProps = {
  posts: any[];
};

const MoreNews: React.FC<MoreNewsProps> = ({ posts }) => {
  return (
    <section className="py-8 lg:py-16">
      <Wrapper>
        <div className="mb-4 lg:mb-6">
          <Divider>More News</Divider>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="flex flex-col gap-6 pb-4 lg:pb-0 lg:col-span-3 lg:pr-12">
            {posts.slice(0, 4).map((post) => (
              <Post4 key={post.id} post={post} />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:col-span-1">
            {posts.map((post) => (
              <Post3 key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default MoreNews;
