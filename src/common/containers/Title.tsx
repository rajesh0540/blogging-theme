import React from "react";

// Components
import Wrapper, { WrapperSize } from "@/common/components/Wrapper";

type TitleProps = {
  name: string;
  size?: WrapperSize;
};

const Title: React.FC<TitleProps> = ({ name, size }) => {
  return (
    <section className="mb-12">
      <Wrapper size={size}>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{name}</h2>
      </Wrapper>
    </section>
  );
};

export default Title;
