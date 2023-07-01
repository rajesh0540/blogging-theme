import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

//
import Wordpress from "@/services/Wordpress";

// Containers
import PostGrid from "@/common/containers/PostGrid";
import Title from "@/common/containers/Title";

const SingleTag: NextPage<{ tag: any; posts: any[] }> = ({ tag, posts }) => {
  return (
    <>
      <Title name={tag.name} />
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
    const tag = await Wordpress.getTagBySlug(slug);

    if (!tag) {
      throw new Error();
    }

    const posts = await Wordpress.getTagPosts([tag.id]);

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
        tag,
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

export default SingleTag;
