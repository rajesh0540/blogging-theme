import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import TagGrid from "@/containers/Tag/TagGrid";

//
import Wordpress from "@/services/Wordpress";

const CategoryListing: NextPage<{ layoutData: any }> = ({ layoutData }) => {
  const { categories } = layoutData;
  const { name, description, site_icon } = layoutData.siteData;

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Categories - ${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Categories - ${name}`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/category"
      />
      <Title name="Categories" />
      <TagGrid tags={categories} slugPrefix="category" />
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
