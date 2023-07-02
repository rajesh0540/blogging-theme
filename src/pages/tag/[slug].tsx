import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";

// Containers
import PostGrid from "@/common/containers/PostGrid";
import Title from "@/common/containers/Title";

//
import Wordpress from "@/services/Wordpress";
import useListing from "@/utils/hooks/useListing";
import optimizeImage from "@/utils/functions/optimizeImage";

const resultsPerPage = 9;

const SingleTag: NextPage<{ layoutData: any; tag: any; posts: any[] }> = ({
  layoutData,
  tag,
  posts: _posts,
}) => {
  const { site_icon } = layoutData.siteData;
  tag.favIcon = site_icon.src;

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: tag.id,
    posts: _posts,
    totalCount: tag.count,
    loadMore: async (page) => {
      const posts = await Wordpress.getTagPosts([tag.id], resultsPerPage, page);

      await Wordpress.populatePostsImages(posts);

      return posts;
    },
  });

  return (
    <>
      <SEOYoast
        yoast_head_json={tag.yoast_head_json}
        pagePath={`/tag/${tag.slug}`}
      />
      <Title name={tag.name} />
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
  const tags = await Wordpress.getAllTags(99);

  return {
    paths: tags.map((tag: any) => {
      return {
        params: {
          slug: tag.slug,
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
    const tag = await Wordpress.getTagBySlug(slug);

    if (!tag) {
      throw new Error();
    }

    const posts = await Wordpress.getTagPosts([tag.id], resultsPerPage, 1);

    await Wordpress.populatePostsImages(posts, optimizeImage);

    posts.forEach((post: any) => {
      const categoryId = post.categories[0];

      if (!categoryId) {
        return;
      }
      const category = layoutData.categories.find(
        (category: any) => category.id === categoryId
      );

      if (!category) return;

      post.category = category;
    });

    return {
      props: {
        layoutData,
        tag,
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

export default SingleTag;
