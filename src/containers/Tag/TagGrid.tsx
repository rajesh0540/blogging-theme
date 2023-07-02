import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

// Containers
import TagCard from "./TagCard";

type TagsProps = {
  slugPrefix?: string;
  tags: any[];
};

const TagGrid: React.FC<TagsProps> = ({ slugPrefix, tags }) => {
  return (
    <>
      <Wrapper>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <TagCard slugPrefix={slugPrefix} tag={tag} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default TagGrid;
