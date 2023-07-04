import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import Content from "@/containers/SinglePage/Content";

//
import Wordpress from "@/services/Wordpress";

type SinglePageProps = {
  page: any;
  layoutData: any;
};
const SinglePage: NextPage<SinglePageProps> = ({ page, layoutData }) => {
  const { site_icon } = layoutData.siteData;
  page.yoast_head_json.favIcon = site_icon.src;

  return (
    <>
      <SEOYoast
        yoast_head_json={page.yoast_head_json}
        pagePath={`/${page.slug}`}
      />
      <Title size="extra-small" name={page.title.rendered} />
      <Content page={page} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const layoutData = await Wordpress.getLayoutData();
    const page = await Wordpress.getPageBySlug(slug);

    if (!page) {
      throw new Error();
    }

    return {
      props: {
        layoutData,
        page,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default SinglePage;
