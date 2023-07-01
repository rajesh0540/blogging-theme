import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

//
import Wordpress from "@/services/Wordpress";

// Containers
import PostGrid from "@/common/containers/PostGrid";
import Title from "@/common/containers/Title";

const SingleAuthor: NextPage<{ author: any; posts: any[] }> = ({
  author,
  posts,
}) => {
  return (
    <>
      <Title name={author.name} />
      <PostGrid posts={posts} />
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
    const author = await Wordpress.getAuthorBySlug(slug);

    if (!author) {
      throw new Error();
    }

    const posts = await Wordpress.getAuthorPosts([author.id]);

    await Wordpress.populatePostsImages(posts);

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
      revalidate: 30,
    };
  } catch (e) {
    console.log("error >>", e);

    return {
      notFound: true,
      revalidate: 1,
    };
  }
};

export default SingleAuthor;
