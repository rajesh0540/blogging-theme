import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import PostGrid from "@/common/containers/PostGrid";
import Title from "@/common/containers/Title";

//
import { Post } from "@/types";
import Wordpress from "@/services/Wordpress";
import useListing from "@/utils/hooks/useListing";
import optimizeImage from "@/utils/functions/optimizeImage";

const resultsPerPage = 9;

const SingleCategory: NextPage<{
  layoutData: any;
  category: any;
  posts: Post[];
}> = ({ layoutData, category, posts: _posts }) => {
  const { site_icon } = layoutData.siteData;
  category.yoast_head_json.favIcon = site_icon.src;

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: category.id,
    posts: _posts,
    totalCount: category.count,
    loadMore: async (page) => {
      const posts = await Wordpress.getCategoryPosts(
        [category.id],
        resultsPerPage,
        page
      );

      await Wordpress.populatePostsImages(posts);

      return posts;
    },
  });

  return (
    <>
      <SEOYoast
        yoast_head_json={category.yoast_head_json}
        pagePath={`/category/${category.slug}`}
      />
      <Title name={category.name} />
      <PostGrid
        posts={posts}
        canLoadMore={canLoadMore}
        loadMore={loadMore}
        loading={loading}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await Wordpress.getAllCategories(99);

  return {
    paths: categories.map((category: any) => {
      return {
        params: {
          slug: category.slug,
        },
      };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const layoutData = await Wordpress.getLayoutData();
    const category = await Wordpress.getCategoryBySlug(slug);
    const posts = await Wordpress.getCategoryPosts(
      [category.id],
      resultsPerPage
    );

    await Wordpress.populatePostsImages(posts, optimizeImage);

    posts.forEach((post: any) => {
      post.category = category;
    });

    if (!category) {
      throw new Error();
    }

    return {
      props: {
        layoutData,
        category,
        posts,
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

export default SingleCategory;
