import React from "react";
import { GetStaticProps, NextPage } from "next";

// Containers
import Title from "@/common/containers/Title";
import TagGrid from "@/containers/Tag/TagGrid";

//
import Wordpress from "@/services/Wordpress";

const TagsListing: NextPage<{ tags: any[] }> = ({ tags }) => {
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
    const tags = await Wordpress.getAllTags();

    return {
      props: {
        layoutData,
        tags: tags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        })),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default TagsListing;
