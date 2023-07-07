import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import PageListing from "@/containers/PageListing";

//
import Wordpress from "@/services/Wordpress";

const Page: NextPage<{ layoutData: any; pages: any[] }> = ({
  layoutData,
  pages,
}) => {
  const { name, description, site_icon } = layoutData.siteData;

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Pages - ${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Pages - ${name}`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/page"
      />
      <Title name="Pages" />
      <PageListing pages={pages} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    const pages = await Wordpress.getAllPages();

    return {
      props: {
        layoutData,
        pages,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Page;
