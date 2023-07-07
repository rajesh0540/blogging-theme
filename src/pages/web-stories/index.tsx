import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import Listing from "@/containers/WebStoryListing/Listing";

//
import Wordpress from "@/services/Wordpress";
import optimizeImage from "@/utils/functions/optimizeImage";

const WebStoryListing: NextPage<{ layoutData: any }> = ({ layoutData }) => {
  const { name, description, site_icon } = layoutData.siteData;
  const { webStories } = layoutData;

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Web Stories - ${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Web Stories - ${name}`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/web-stories"
      />
      <Title name="Web Stories" />
      <Listing webStories={webStories} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();

    for (const story of layoutData.webStories) {
      const posterUrl = story.poster?.url;

      if (posterUrl) {
        const { placeholder } = await optimizeImage({ src: posterUrl });
        story.poster.placeholder = placeholder;
      }
    }

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

export default WebStoryListing;
