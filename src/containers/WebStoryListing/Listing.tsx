import React, { useMemo, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";

// Components
import Wrapper from "@/common/components/Wrapper";
import { useRouter } from "next/router";

type ListingProps = {
  webStories: any[];
  webStoryCategories: any[];
};
const Listing: React.FC<ListingProps> = ({
  webStories,
  webStoryCategories: _webStoryCategories,
}) => {
  const { push, query } = useRouter();
  const activeCategory = query.category || "";

  const setActiveCategory = useCallback(
    (category: string) => {
      const query: any = {};

      if (category) {
        query.category = category;
      }

      push(
        {
          pathname: "/web-stories",
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [push]
  );

  const webStoryCategories = useMemo(() => {
    return [
      {
        name: "All",
        slug: "",
      },
      ..._webStoryCategories,
    ];
  }, [_webStoryCategories]);

  return (
    <>
      <Wrapper>
        <ul className="flex mb-8 border-b-2 border-secondary bg-slate-200">
          {webStoryCategories.map((category: any) => {
            const isActive = category.slug === activeCategory;

            return (
              <li>
                <button
                  className={`block h-10 px-6 font-medium ${
                    isActive ? "bg-slate-300" : ""
                  } `}
                  onClick={() => {
                    setActiveCategory(category.slug);
                  }}
                >
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>

        {_webStoryCategories.map((category: any) => {
          const categoryStories = webStories.filter((story: any) =>
            story.web_story_category.includes(category.id)
          );

          if (categoryStories.length < 1) return null;
          if (activeCategory && category.slug !== activeCategory) return null;

          return (
            <section className="mb-6">
              {!activeCategory && (
                <h2 className="mb-3 text-4xl font-semibold">{category.name}</h2>
              )}
              <ul className="flex flex-wrap gap-2 p-2 bg-gray-100">
                {categoryStories.slice().map((story) => {
                  const width = 192;

                  return (
                    <li key={story.id} className="relative w-36 lg:w-48">
                      <Link
                        href={`/web-stories/${story.slug}`}
                        aria-label={`Story ${story.slug}`}
                      >
                        {story.poster ? (
                          <NextImage
                            className="w-full"
                            src={story.poster.url}
                            alt={`Story ${story.slug}`}
                            height={
                              (story.poster.height / story.poster.width) * width
                            }
                            width={width}
                            blurDataURL={story.poster.placeholder}
                            placeholder="blur"
                          />
                        ) : (
                          <div className="w-full aspect-[3/4] bg-gray-300"></div>
                        )}
                        <h3 className="mt-1 text-sm">
                          {story.title || "Untitled"}
                        </h3>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Listing;
