import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: string;
  variant?: "left" | "center";
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "left",
  type,
  disabled,
  onClick,
}) => {
  let variantClasses = {
    left: "ml-3 lg:ml-4",
    center: "ml-0 lg:ml-0",
  };

  return (
    <>
      <button
        className={`px-3 py-1 text-white rounded-md bg-primary disabled:bg-primary_light disabled:cursor-not-allowed ${variantClasses[variant]}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
