import React from "react";

type PostSubHeadingProps = {
  children: React.ReactNode;
};

const PostSubHeading: React.FC<PostSubHeadingProps> = ({ children }) => {
  return (
    <>
      <h2 className="text-[32px] font-semibold pb-[10px]">{children}</h2>
      <div className="h-[0.2px] bg-black w-full mb-[24px]"></div>
    </>
  );
};

export default PostSubHeading;
