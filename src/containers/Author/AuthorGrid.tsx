import React from "react";

// Components
import AuthCard from "@/containers/Author/AuthorCard";
import Wrapper from "@/common/components/Wrapper";

type AuthorProps = {
  authors: any[];
};

const AuthorGrid: React.FC<AuthorProps> = ({ authors }) => {
  return (
    <>
      <Wrapper>
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((item) => (
            <AuthCard authors={item} />
          ))}
        </section>
      </Wrapper>
    </>
  );
};

export default AuthorGrid;
