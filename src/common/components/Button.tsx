import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: string;
  variant?: "left" | "center";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "left",
  type,
}) => {
  let variantClasses = {
    left: "ml-3 ,lg:ml-4 ",
    center: "ml-0 ,lg:ml-0 ",
  };
  let classes = variantClasses[variant];
  return (
    <>
      <button
        className={`px-4 py-1  text-white rounded-md bg-primary  ${classes}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
