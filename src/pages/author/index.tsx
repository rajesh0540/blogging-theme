import React from "react";
import { GetStaticProps, NextPage } from "next";

// Containers
import Title from "@/common/containers/Title";
import AuthorGrid from "@/containers/Author/AuthorGrid";

//
import Wordpress from "@/services/Wordpress";

const AuthorListing: NextPage<{ authors: any[] }> = ({ authors }) => {
  return (
    <>
      <Title name="Authors" />
      <AuthorGrid />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    const authors = await Wordpress.getAllAuthors();

    return {
      props: {
        layoutData,
        authors,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default AuthorListing;
