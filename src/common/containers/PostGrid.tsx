import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Post1 from "@/common/components/Post1";
import Button from "../components/Button";

interface CategoryProps {
  posts: any[];
  loading?: boolean;
  canLoadMore?: boolean;
  loadMore?: () => void;
}

const PostGrid: React.FC<CategoryProps> = ({
  posts,
  loading,
  canLoadMore,
  loadMore,
}) => {
  return (
    <section>
      <Wrapper>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Post1 post={post} imageWidth={427} />
          ))}
        </div>
        {canLoadMore && (
          <div className="flex items-center justify-center mt-12">
            <div>
              <Button disabled={loading} onClick={loadMore} variant="center">
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default PostGrid;
