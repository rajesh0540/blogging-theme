import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import TagGrid from "@/containers/Tag/TagGrid";

//
import Wordpress from "@/services/Wordpress";

const TagsListing: NextPage<{ layoutData: any; tags: any[] }> = ({
  layoutData,
  tags,
}) => {
  const { name, description, site_icon } = layoutData.siteData;
  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Tags - ${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Tags - ${name}`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/tag"
      />
      <Title name="Tags" />
      <TagGrid tags={tags} />
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
      revalidate: 1800,
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default TagsListing;
