import React from "react";
import NextImage from "next/image";
import Link from "next/link";

// Components
import Wrapper from "@/common/components/Wrapper";

type ListingProps = {
  webStories: any[];
};
const Listing: React.FC<ListingProps> = ({ webStories }) => {
  return (
    <section>
      <Wrapper>
        <ul className="flex flex-wrap gap-5">
          {webStories.map((story) => (
            <li
              key={story.id}
              className="relative p-2 overflow-hidden border-2 border-gray-500 rounded-full w-36 h-36 lg:w-48 lg:h-48"
            >
              <div className="w-full h-full overflow-hidden rounded-full">
                {story.poster ? (
                  <NextImage
                    className="object-cover w-full h-full"
                    src={story.poster.url}
                    alt={`Story ${story.slug}`}
                    height={(story.poster.height / story.poster.width) * 192}
                    width={192}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
              </div>
              <Link
                href={`/web-stories/${story.slug}`}
                aria-label={`Story ${story.slug}`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-0 hover:bg-opacity-25"></div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  );
};

export default Listing;
