import React, { useState } from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

//
import { LeftAngle, RightAngle } from "@/common/components/Icon";

export type WebStoriesProps = {
  webStories: any[];
};

const WebStoriesComponent: React.FC<WebStoriesProps> = ({ webStories }) => {
  const [activeStory, setActiveStory] = useState<null | number>(null);

  const prevStory = () => {
    setActiveStory((prev) => {
      if (prev === 0 || prev === null) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const nextStory = () => {
    setActiveStory((prev) => {
      if (prev === webStories.length - 1 || prev === null) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

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
                  <iframe
                    src={`/api/web-stories/${story.slug}`}
                    className="w-full h-full border-none"
                    title={`Web story ${story.slug}`}
                    scrolling="no"
                  />
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-0 cursor-pointer hover:opacity-30"
                  onClick={() => setActiveStory(index)}
                ></div>
              </li>
            ))}
          </ul>
        </Wrapper>
      </div>
      {activeStory !== null && (
        <>
          <div className="fixed top-0 left-0 z-10 w-full h-full backdrop-blur-xl"></div>
          <div className="fixed top-0 left-0 z-20 flex justify-center w-full h-full py-10 ">
            <div className="absolute z-40 -translate-y-1/2 top-1/2 left-3">
              <button
                className="flex items-center justify-center w-10 h-10 text-gray-800 bg-gray-500 rounded-full bg-opacity-20"
                onClick={prevStory}
              >
                <LeftAngle size={40} />
              </button>
            </div>
            <div className="h-full rounded-2xl overflow-hidden aspect-[2/3] bg-slate-600 bg-opacity-60 z-40">
              {webStories.map((story, i: number) => {
                const isActive = i === activeStory;

                return (
                  <iframe
                    src={`/api/web-stories/${story.slug}`}
                    className={`${isActive ? "" : "hidden"} w-full h-full`}
                    title={`Web story ${story.slug}`}
                    scrolling="no"
                  />
                );
              })}
            </div>
            <div className="absolute z-40 -translate-y-1/2 top-1/2 right-3">
              <button
                className="flex items-center justify-center w-10 h-10 text-gray-800 bg-gray-500 rounded-full bg-opacity-20"
                onClick={nextStory}
              >
                <RightAngle size={40} />
              </button>
            </div>
            <div
              className="absolute top-0 bottom-0 left-0 right-0"
              onClick={() => setActiveStory(null)}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default WebStoriesComponent;
