import React, { useState } from "react";
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

const SingleAuthor: NextPage<{
  layoutData: any;
  author: any;
  posts: any[];
}> = ({ layoutData, author, posts: _posts }) => {
  const { site_icon } = layoutData.siteData;
  author.yoast_head_json.favIcon = site_icon.src;
  author.yoast_head_json.description = author.description;

  const [totalCount, setTotalCount] = useState(Infinity);

  const { posts, loading, loadMore, canLoadMore } = useListing({
    key: author.id,
    posts: _posts,
    totalCount,
    loadMore: async (page) => {
      const fetchedPosts = await Wordpress.getAuthorPosts(
        [author.id],
        resultsPerPage,
        page
      );
      await Wordpress.populatePostsImages(fetchedPosts);

      const newTotalPosts = fetchedPosts.length + posts.length;

      if (fetchedPosts.length < resultsPerPage) {
        setTotalCount(newTotalPosts);
      }

      return fetchedPosts;
    },
  });

  return (
    <>
      <SEOYoast
        yoast_head_json={author.yoast_head_json}
        pagePath={`/author/${author.slug}`}
      />
      <Title name={author.name} />
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
  const authors = await Wordpress.getAllAuthors(99);

  return {
    paths: authors.map((author: any) => {
      return {
        params: {
          slug: author.slug,
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
    const author = await Wordpress.getAuthorBySlug(slug);

    if (!author) {
      throw new Error();
    }

    const posts = await Wordpress.getAuthorPosts(
      [author.id],
      resultsPerPage,
      1
    );

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
        author,
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

export default SingleAuthor;
