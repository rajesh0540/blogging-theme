import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  size?: "small" | "medium";
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "medium",
  className,
}) => {
  const sizeClasses = {
    small: "max-w-[700px]",
    medium: "max-w-[1200px]",
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
