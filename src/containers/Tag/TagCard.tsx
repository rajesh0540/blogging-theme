import React from "react";

//
import Link from "next/link";

interface TagProps {
  content: string;
}

const TagCard: React.FC<TagProps> = ({ content }) => {
  return (
    <div className="bg-gray-100 p-[24px] border-l-4 rounded-[4px] border-primary">
      <Link href="/">
        <h3 className="text[18px] ">{content}</h3>
      </Link>
    </div>
  );
};

export default TagCard;
