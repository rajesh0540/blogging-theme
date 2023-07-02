import React from "react";

export enum TagVariants {
  COLORED = "colored",
  GREY = "grey",
}
type TagVariantClasses = {
  [key in TagVariants]: string;
};

type TagProps = {
  children?: React.ReactNode;
  variant?: TagVariants;
};

const Tag: React.FC<TagProps> = ({
  children,
  variant = TagVariants.COLORED,
}) => {
  const variantClasses: TagVariantClasses = {
    [TagVariants.COLORED]: "bg-secondary text-white",
    [TagVariants.GREY]: "bg-gray-400 text-white",
  };

  return (
    <h2
      className={`inline-block px-3 py-1 text-lg font-semibold uppercase tag ${variantClasses[variant]}`}
    >
      {children}
    </h2>
  );
};

export default Tag;
