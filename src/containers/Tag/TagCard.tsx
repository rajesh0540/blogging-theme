import React from "react";

//
import Link from "next/link";

interface TagProps {
  slugPrefix?: string;
  tag: any;
}

const TagCard: React.FC<TagProps> = ({ slugPrefix = "tag", tag }) => {
  const { name, slug } = tag;
  return (
    <div className="bg-gray-100 p-[24px] border-l-4 rounded-[4px] border-primary">
      <Link href={`/${slugPrefix}/${slug}`}>
        <h3 className="text[18px] ">{name}</h3>
      </Link>
    </div>
  );
};

export default TagCard;
