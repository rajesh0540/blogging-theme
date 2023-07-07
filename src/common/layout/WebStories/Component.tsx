import React from "react";
import Link from "next/link";
import NextImage from "next/image";

// Components
import Wrapper from "@/common/components/Wrapper";

export type WebStoriesProps = {
  webStories: any[];
};

const WebStoriesComponent: React.FC<WebStoriesProps> = ({ webStories }) => {
  return (
    <>
      <div className="mb-5">
        <Wrapper>
          <ul className="flex flex-wrap justify-center gap-4">
            {webStories.map((story: any, index: number) => (
              <li
                className="p-[3px] overflow-hidden border-gray-500 rounded-full border-[2px] relative"
                key={story.slug}
              >
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  {story.poster ? (
                    <NextImage
                      alt={`Story ${story.slug}`}
                      className="object-cover w-full h-full"
                      src={story.poster.url}
                      height={(story.poster.height / story.poster.width) * 64}
                      width={64}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400"></div>
                  )}
                </div>
                <Link href={`/web-stories/${story.slug}`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-0 cursor-pointer hover:opacity-30"></div>
                </Link>
              </li>
            ))}
          </ul>
        </Wrapper>
      </div>
    </>
  );
};

export default WebStoriesComponent;
