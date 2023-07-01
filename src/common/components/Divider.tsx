import React from "react";

// Components
import Tag from "./Tag";

type DividerProps = {
  children?: React.ReactNode;
  dark?: boolean;
};

const Divider: React.FC<DividerProps> = ({ children, dark }) => {
  return (
    <div className="relative flex justify-center">
      <div
        className={`absolute left-0 right-0 h-[1px] ${
          dark ? "bg-gray-500" : "bg-black"
        } top-1/2 `}
      ></div>
      <Tag>{children}</Tag>
    </div>
  );
};

export default Divider;
