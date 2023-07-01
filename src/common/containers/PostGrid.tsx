import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Post1 from "@/common/components/Post1";

interface CategoryProps {
  posts: any[];
}

const PostGrid: React.FC<CategoryProps> = ({ posts }) => {
  return (
    <section>
      <Wrapper>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Post1 post={post} />
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default PostGrid;
