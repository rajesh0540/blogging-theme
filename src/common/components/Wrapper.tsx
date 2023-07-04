import React from "react";

export type WrapperSize = "extra-small" | "small" | "medium";

type WrapperProps = {
  children: React.ReactNode;
  size?: WrapperSize;
  className?: string;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "medium",
  className,
}) => {
  const sizeClasses = {
    "extra-small": "max-w-[720px]",
    small: "max-w-[1080px]",
    medium: "max-w-[1320px]",
  };

  return (
    <div className="px-4">
      <div className={`w-full mx-auto ${sizeClasses[size]} ${className || ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
