import React, { useState } from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import PostSubHeading from "@/common/containers/PostSubHeading";
import Post1 from "@/common/components/Post1";

//
import useListing from "@/utils/hooks/useListing";
import Wordpress from "@/services/Wordpress";
import Button from "@/common/components/Button";

type RelatedPostsProps = {
  posts: any[];
  categoryId: number;
  resultsPerPage: number;
};

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts: _posts,
  categoryId,
  resultsPerPage,
}) => {
  const [totalCount, setTotalCount] = useState(Infinity);

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: `${categoryId}`,
    posts: _posts,
    totalCount,
    loadMore: async (page) => {
      const fetchedPosts = await Wordpress.getCategoryPosts(
        [categoryId],
        resultsPerPage,
        page
      );
      await Wordpress.populatePostsImages(fetchedPosts);

      const newTotalPosts = fetchedPosts.length + posts.length;

      if (fetchedPosts.length < resultsPerPage) {
        setTotalCount(newTotalPosts);
      }

      return fetchedPosts;
    },
  });

  return (
    <section className="mb-[60px]">
      <Wrapper size="medium">
        <PostSubHeading>Related Posts</PostSubHeading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Post1 key={post.id} post={post} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {canLoadMore && (
            <Button disabled={loading} onClick={loadMore} variant="center">
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default RelatedPosts;
