import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import AuthorGrid from "@/containers/Author/AuthorGrid";

//
import Wordpress from "@/services/Wordpress";

const AuthorListing: NextPage<{ layoutData: any; authors: any[] }> = ({
  layoutData,
  authors,
}) => {
  const { name, description, site_icon } = layoutData.siteData;

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Authors - ${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Authors - ${name}`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/author"
      />
      <Title name="Authors" />
      <AuthorGrid authors={authors} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    const authors = await Wordpress.getAllAuthors(99);

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
