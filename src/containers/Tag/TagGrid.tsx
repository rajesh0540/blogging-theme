import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

// Containers
import TagCard from "./TagCard";

const Tags = [
  { content: "Anime" },
  { content: "Baby Health" },
  { content: "Boxing" },
  { content: "Anime" },
  { content: "Anime" },
  { content: "Baby Health" },
  { content: "Boxing" },
  { content: "Anime" },
  { content: "Anime" },
  { content: "Baby Health" },
  { content: "Boxing" },
  { content: "Anime" },
];

const TagGrid = () => {
  return (
    <>
      <Wrapper>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Tags.map((tag) => (
            <TagCard content={tag.content} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default TagGrid;
