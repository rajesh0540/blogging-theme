import React from "react";
import { GetStaticProps, NextPage } from "next";

// Containers
import Title from "@/common/containers/Title";
import TagGrid from "@/containers/Tag/TagGrid";

//
import Wordpress from "@/services/Wordpress";

const CategoryListing: NextPage<{ layoutData: { categories: any[] } }> = ({
  layoutData,
}) => {
  const { categories } = layoutData;

  return (
    <>
      <Title name="Tags" />
      <TagGrid />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    return {
      props: {
        layoutData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default CategoryListing;
