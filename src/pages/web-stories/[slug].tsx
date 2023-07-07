import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

//
import Wordpress from "@/services/Wordpress";

type WebStoryProps = {
  webStory: any;
  site_icon: any;
};
const WebStory: NextPage<WebStoryProps> = ({ webStory, site_icon }) => {
  const { yoast_head_json, slug, link } = webStory;
  yoast_head_json.favIcon = site_icon.src;

  return (
    <>
      <SEOYoast
        yoast_head_json={yoast_head_json}
        pagePath={`/web-stories/${slug}`}
      />
      <iframe className="w-screen h-screen" src={link} />
    </>
  );
};

// @ts-ignore
WebStory.layout = false;

export const getStaticPaths: GetStaticPaths = async () => {
  const webStories = await Wordpress.getAllWebStories();

  return {
    fallback: "blocking",
    paths: webStories.map((story: any) => {
      return {
        params: {
          slug: story.slug,
        },
      };
    }),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const { site_icon } = await Wordpress.getSiteData();
    const webStory = await Wordpress.getWebStoryBySlug(slug);

    if (!webStory) {
      throw new Error();
    }

    return {
      props: {
        webStory: {
          link: webStory.link,
          yoast_head_json: webStory.yoast_head_json,
          slug: webStory.slug,
        },
        site_icon,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default WebStory;
