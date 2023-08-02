import React, { useState } from "react";

// Container
import PostSubHeading from "@/common/containers/PostSubHeading";

// Components
import Wrapper from "@/common/components/Wrapper";
import Button from "@/common/components/Button";
import Post1 from "@/common/components/Post1";

//
import useListing from "@/utils/hooks/useListing";
import Wordpress from "@/services/Wordpress";

type LatestPostsProps = {
  posts: any[];
  resultsPerPage: number;
};

const LatestPosts: React.FC<LatestPostsProps> = ({
  posts: _posts,
  resultsPerPage,
}) => {
  const [totalCount, setTotalCount] = useState(Infinity);

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: "static",
    posts: _posts,
    totalCount,
    loadMore: async (page) => {
      const fetchedPosts = await Wordpress.getAllPosts(resultsPerPage, page);
      await Wordpress.populatePostsImages(fetchedPosts);

      const newTotalPosts = fetchedPosts.length + posts.length;

      if (fetchedPosts.length < resultsPerPage) {
        setTotalCount(newTotalPosts);
      }

      return fetchedPosts;
    },
  });

  return (
    <section>
      <Wrapper size="medium">
        <PostSubHeading>Latest Posts</PostSubHeading>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-4">
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

export default LatestPosts;
