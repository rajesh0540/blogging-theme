import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Post1 from "@/common/components/Post1";
import Post2 from "@/common/components/Post2";
import Post3 from "@/common/components/Post3";
import Divider from "@/common/components/Divider";

export type CategoryPostsArrangements = "one" | "two" | "three";

type CategoryPostsProps = {
  name: string;
  posts: any[];
  dark?: boolean;
  arrangement?: CategoryPostsArrangements;
};
const CategoryPosts: React.FC<CategoryPostsProps> = ({
  name,
  posts,
  dark = false,
  arrangement = "one",
}) => {
  const featuredPosts = posts.slice(0, 1);
  const columnPosts = posts.slice(1, 3);
  const listingPosts = posts.slice(3, 7);

  return (
    <section className={`py-8 lg:py-16  ${dark ? "bg-gray-950" : ""}`}>
      <Wrapper>
        <div className="mb-4 lg:mb-6">
          <Divider dark={dark}>{name}</Divider>
        </div>
        {["one", "two"].includes(arrangement) && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 lg:grid-cols-7">
            {featuredPosts.length > 0 && (
              <div
                className={`${
                  arrangement === "one" ? "" : "md:order-2"
                } md:col-span-3`}
              >
                {featuredPosts.map((post: any) => (
                  <Post2
                    classes="h-[600px]"
                    imageHeight={600}
                    imageWidth={554}
                    post={post}
                  />
                ))}
              </div>
            )}
            {columnPosts.length > 0 && (
              <div
                className={`flex flex-col gap-6 md:col-span-2 ${
                  arrangement === "one" ? "" : "md:order-1"
                }`}
              >
                {columnPosts.map((post: any) => (
                  <Post1 post={post} imageWidth={363} />
                ))}
              </div>
            )}
            {listingPosts.length > 0 && (
              <div
                className={`flex flex-col gap-4 md:col-span-2 ${
                  arrangement === "one" ? "" : "md:order-3"
                }`}
              >
                {listingPosts.map((post) => (
                  <Post3 key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
        {arrangement === "three" && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            {featuredPosts && (
              <div className=" lg:col-span-3">
                {featuredPosts.map((post) => (
                  <Post2
                    post={post}
                    classes="h-[600px]"
                    imageHeight={600}
                    imageWidth={784}
                    dark={dark}
                  />
                ))}
              </div>
            )}
            <div className="flex flex-col gap-5 lg:col-span-2">
              {posts.slice(1, 5).map((post) => (
                <Post3
                  key={post.id}
                  headingClasses="font-bold text-xl leading-5"
                  imageClasses="h-32 w-32"
                  post={post}
                  dark={dark}
                />
              ))}
            </div>
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default CategoryPosts;
