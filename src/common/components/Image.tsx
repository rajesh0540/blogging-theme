import React from "react";

// Components

type ImageProps = {
  src: string;
  classes?: string;
  imgClasses?: string;
};

const Image: React.FC<ImageProps> = ({ src, classes, imgClasses }) => {
  return (
    <div
      className={`${
        classes || ""
      } flex items-center justify-center overflow-hidden relative`}
    >
      <div className="absolute w-full h-full transition-all bg-black bg-opacity-0 group-hover:bg-opacity-30"></div>
      <img
        src={src}
        className={`${imgClasses || ""} h-full w-full object-cover`}
      />
    </div>
  );
};

export default Image;
