import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

//
import Wordpress from "@/services/Wordpress";

// Containers
import PostGrid from "@/common/containers/PostGrid";
import Title from "@/common/containers/Title";

const SingleCategory: NextPage<{ category: any; posts: any[] }> = ({
  category,
  posts,
}) => {
  return (
    <>
      <Title name={category.name} />
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
    const category = await Wordpress.getCategoryBySlug(slug);
    const posts = await Wordpress.getCategoryPosts([category.id]);

    await Wordpress.populatePostsImages(posts);

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

export default SingleCategory;
