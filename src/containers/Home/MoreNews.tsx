import React, { useState } from "react";

// Components
import Button from "@/common/components/Button";
import Wrapper from "@/common/components/Wrapper";
import Divider from "@/common/components/Divider";
import Post3 from "@/common/components/Post3";
import Post4 from "@/common/components/Post4";

//
import useListing from "@/utils/hooks/useListing";
import Wordpress from "@/services/Wordpress";

type MoreNewsProps = {
  posts: any[];
  resultsPerPage: number;
};

const MoreNews: React.FC<MoreNewsProps> = ({
  posts: _posts,
  resultsPerPage,
}) => {
  const [totalCount, setTotalCount] = useState(Infinity);

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: "static",
    posts: _posts.slice(0, 4),
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
      <Wrapper>
        <div className="mb-4 lg:mb-6">
          <Divider>More News</Divider>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-6 pb-4 lg:pb-0 lg:col-span-3 lg:pr-12">
            {posts.map((post) => (
              <div className="w-full">
                <Post4 key={post.id} post={post} />
              </div>
            ))}
            <div>
              {canLoadMore && (
                <Button disabled={loading} onClick={loadMore} variant="center">
                  {loading ? "Loading..." : "Load More"}
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:col-span-1">
            {_posts.slice(9).map((post) => (
              <Post3 key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default MoreNews;
