import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage, GetStaticProps } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import Title from "@/common/containers/Title";
import PostGrid from "@/common/containers/PostGrid";

//
import Wordpress from "@/services/Wordpress";

const Search: NextPage<{ layoutData: any }> = ({ layoutData }) => {
  const { name, description, site_icon } = layoutData.siteData;

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const query = useRouter().query.q as string;

  useEffect(() => {
    if (query) {
      (async () => {
        setLoading(true);
        setPosts([]);

        const posts = await Wordpress.searchPosts(query);
        await Wordpress.populatePostsImages(posts);

        setPosts(posts);
        setLoading(false);
      })();
    }
  }, [query]);

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `Search results for "${query || ""}"`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `Search results for "${query || ""}"`,
          og_description: description,
          og_site_name: name,
        }}
        pagePath="/"
      />
      <Title name={`Showing results for "${query || ""}"`} />
      <PostGrid posts={posts} loading={loading} canLoadMore={loading} />
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

export default Search;
