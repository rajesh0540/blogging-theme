import React from "react";
import Image from "next/image";

type PostImageProps = {
  data: {
    src: string;
    alt: string;
    placeholder?: string;
    height: number;
    width: number;
    loading?: "lazy" | "eager";
  };
  containerClasses?: string;
  imgClasses?: string;
};

const PostImage: React.FC<PostImageProps> = ({
  containerClasses = "",
  imgClasses = "",
  data,
}) => {
  const { src, alt, placeholder, height, width, loading = "lazy" } = data;

  return (
    <div
      className={`${containerClasses} flex items-center justify-center overflow-hidden relative`}
    >
      <div className="absolute w-full h-full transition-all bg-black bg-opacity-0 group-hover:bg-opacity-30"></div>
      <Image
        src={src}
        alt={alt}
        {...(placeholder
          ? {
              placeholder: "blur",
              blurDataURL: placeholder,
            }
          : {})}
        height={height}
        width={width}
        className={`${imgClasses} h-full w-full object-cover`}
        loading={loading}
      />
    </div>
  );
};

export default PostImage;
