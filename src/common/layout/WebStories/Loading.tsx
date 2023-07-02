import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

const Loading = () => {
  return (
    <div className="mb-5">
      <Wrapper>
        <ul className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              className="p-[3px] overflow-hidden border-gray-400 rounded-full border-[2px] relative"
              key={i}
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default Loading;
