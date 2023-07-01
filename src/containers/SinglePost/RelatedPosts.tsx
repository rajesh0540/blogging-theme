import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import PostSubHeading from "@/common/containers/PostSubHeading";
import Post1 from "@/common/components/Post1";

type RelatedPostsProps = {
  posts: any[];
};

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <section className="mb-[80px]">
      <Wrapper size="medium">
        <PostSubHeading>Related Posts</PostSubHeading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Post1 key={post.id} post={post} />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default RelatedPosts;
