import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Post1 from "@/common/components/Post1";
import Post2 from "@/common/components/Post2";
import Post3 from "@/common/components/Post3";
import Divider from "@/common/components/Divider";

interface TrendingProps {
  trendingPosts: any[];
  featuredPosts: any[];
  posts: any[];
}

const Trending: React.FC<TrendingProps> = ({
  trendingPosts,
  featuredPosts,
  posts,
}) => {
  return (
    <section>
      <Wrapper>
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-5 lg:grid-cols-7">
          {trendingPosts.length > 0 && (
            <div className="flex flex-col order-2 gap-5 lg:order-1 md:col-span-2">
              <Divider>Trending</Divider>
              {trendingPosts.slice(0, 5).map((post, i) => (
                <Post1
                  key={post.id}
                  index={i + 1}
                  post={post}
                  loading="eager"
                  imageWidth={363}
                />
              ))}
            </div>
          )}
          {featuredPosts.length > 0 && (
            <div className="flex flex-col order-1 gap-5 lg:order-2 md:col-span-3">
              {featuredPosts.map((post, i) => {
                const isFirst = i === 0;

                return (
                  <Post2
                    key={post.id}
                    classes={`${isFirst ? "h-[600px]" : "h-[312px]"} `}
                    imageHeight={isFirst ? 600 : 312}
                    imageWidth={554}
                    post={post}
                    loading="eager"
                  />
                );
              })}
            </div>
          )}
          {posts.length > 0 && (
            <div className="flex flex-col order-3 gap-4 lg:order-3 md:col-span-2">
              <Divider>Latest</Divider>
              {posts.map((post) => (
                <Post3 key={post.id} post={post} loading="eager" />
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default Trending;
