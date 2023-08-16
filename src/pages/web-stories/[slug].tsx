import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

//
import Wordpress from "@/services/Wordpress";

const hostedUrl = process.env.HOSTED_URL || "";

type WebStoryProps = {
  webStory: any;
  site_icon: any;
};
const WebStory: NextPage<WebStoryProps> = ({ webStory, site_icon }) => {
  const { yoast_head_json, slug, link } = webStory;
  yoast_head_json.favIcon = site_icon.src;

  console.log("webStory >>", webStory);

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

    if (webStory.featured_media) {
      const featuredMedia = await Wordpress.getMediaById(
        webStory.featured_media
      );

      const nodes = webStory.yoast_head_json.schema["@graph"];
      const mediaId = `${hostedUrl}/web-stories/${webStory.slug}#primaryimage`;

      nodes.forEach((node: any) => {
        const nodeType = node["@type"];
        if (["Article", "WebPage"].includes(nodeType)) {
          node.thumbnailUrl = featuredMedia.full.src;
          node.image = {
            "@id": mediaId,
          };
        }

        if (nodeType === "WebPage") {
          node.primaryImageOfPage = {
            "@id": mediaId,
          };
        }
      });

      nodes.push({
        "@type": "ImageObject",
        inLanguage: "en-US",
        "@id": mediaId,
        url: featuredMedia.full.src,
        contentUrl: featuredMedia.full.src,
        width: featuredMedia.full.width,
        height: featuredMedia.full.height,
        caption: featuredMedia.caption,
      });
    }

    if (!webStory) {
      throw new Error();
    }

    return {
      props: {
        webStory,
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
