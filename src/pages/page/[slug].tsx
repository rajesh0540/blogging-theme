import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

// Containers
import Title from "@/common/containers/Title";
import Content from "@/containers/SinglePage/Content";

//
import Wordpress from "@/services/Wordpress";

type SinglePageProps = {
  page: any;
};
const SinglePage: NextPage<SinglePageProps> = ({ page }) => {
  return (
    <>
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
