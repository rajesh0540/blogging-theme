import React from "react";

type TagProps = {
  children?: React.ReactNode;
};

const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <h6 className="inline-block px-3 py-1 text-lg font-semibold text-white uppercase bg-secondary tag">
      {children}
    </h6>
  );
};

export default Tag;
