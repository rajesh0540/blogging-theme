import React from "react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";

//
import Wordpress from "@/services/Wordpress";

const Page404: NextPage<{
  layoutData: any;
}> = ({ layoutData }) => {
  const { name, description, site_icon } = layoutData.siteData;

  return (
    <>
      <Head>
        <title>Page not found - {name}</title>
        <meta name="description" content={description} />
        {site_icon && (
          <>
            <link rel="icon" href={site_icon.src} />
            <link rel="apple-touch-icon" href={site_icon.src} />
          </>
        )}
      </Head>
      <div className="flex flex-col items-center py-32 text-center lg:py-52">
        <span className="text-2xl font-medium lg:mb-1 lg:text-3xl">404</span>
        <h1 className="text-4xl font-semibold text-center lg:text-5xl">
          Page not found
        </h1>
      </div>
    </>
  );
};

export default Page404;

export const getStaticProps: GetStaticProps = async () => {
  const layoutData = await Wordpress.getLayoutData();

  return {
    props: {
      layoutData,
    },
  };
};
