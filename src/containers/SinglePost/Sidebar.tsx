import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";

// Components
import Divider from "@/common/components/Divider";
import Tag, { TagVariants } from "@/common/components/Tag";
import Post3 from "@/common/components/Post3";

//
import { Post } from "@/types";

type SidebarProps = {
  latestPosts: Post[];
  popularPosts: Post[];
};

const Sidebar: React.FC<SidebarProps> = ({ latestPosts, popularPosts }) => {
  const router = useRouter();

  const tabs = useMemo(() => {
    return [
      {
        key: "latest",
        title: "Latest",
        posts: latestPosts,
      },
      {
        key: "popular",
        title: "Popular",
        posts: popularPosts,
      },
    ];
  }, [latestPosts, popularPosts]);

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [query, setQuery] = useState("");

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab);
  }, [tabs, activeTab])!;

  const onSearchHandler: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (query) {
        router.push(
          {
            pathname: "/search",
            query: {
              q: query,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    },
    [query, router]
  );

  return (
    <>
      <Divider>Search</Divider>
      <div className="mt-3 mb-9">
        <form onSubmit={onSearchHandler}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full px-2 py-1 border border-gray-300"
          />
        </form>
      </div>
      <ul className="flex justify-center gap-4 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <li key={tab.key}>
              <button onClick={() => setActiveTab(tab.key)}>
                <Tag
                  variant={isActive ? TagVariants.COLORED : TagVariants.GREY}
                >
                  {tab.title}
                </Tag>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-4">
        {tab.posts.slice(0, 9).map((post) => (
          <Post3 key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Sidebar;
