import React from "react";

// Components
import Wrapper from "@/common/components/Wrapper";

type TitleProps = {
  name: string;
};

const Title: React.FC<TitleProps> = ({ name }) => {
  return (
    <section className="mb-12">
      <Wrapper>
        <span></span>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{name}</h2>
      </Wrapper>
    </section>
  );
};

export default Title;
