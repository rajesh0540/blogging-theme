import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";
import Post1 from "@/common/components/Post1";
import Post2 from "@/common/components/Post2";
import Post3 from "@/common/components/Post3";
import Divider from "@/common/components/Divider";

interface sectionProps {
  name: string;
  posts: any[];
  dark?: boolean;
  arrangement?: "one" | "two" | "three";
}
const CategoryPosts: React.FC<sectionProps> = ({
  name,
  posts,
  dark = false,
  arrangement = "one",
}) => {
  return (
    <section className={`py-8 lg:py-16  ${dark ? "bg-gray-950" : ""}`}>
      <Wrapper>
        <div className="mb-4 lg:mb-6">
          <Divider dark={dark}>{name}</Divider>
        </div>
        {["one", "two"].includes(arrangement) && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5 lg:grid-cols-7">
            <div
              className={`${
                arrangement === "one" ? "" : "md:order-2"
              } md:col-span-3`}
            >
              <Post2 classes="h-[600px]" post={posts[0]} />
            </div>
            <div
              className={`flex flex-col gap-6 md:col-span-2 ${
                arrangement === "one" ? "" : "md:order-1"
              }`}
            >
              <Post1 post={posts[1]} />
              <Post1 post={posts[2]} />
            </div>
            <div
              className={`flex flex-col gap-4 md:col-span-2 ${
                arrangement === "one" ? "" : "md:order-3"
              }`}
            >
              {posts.slice(3, 6).map((post) => (
                <Post3 key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
        {arrangement === "three" && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className=" lg:col-span-3">
              <Post2 post={posts[0]} classes="h-[600px]" dark={dark} />
            </div>
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
