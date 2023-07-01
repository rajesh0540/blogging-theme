import React from "react";
import { GetStaticProps, NextPage } from "next";

// Containers
import Trending from "@/containers/Home/Trending";
import CategoryPosts from "@/containers/Home/CategoryPosts";
import MoreNews from "@/containers/Home/MoreNews";
//
import Wordpress from "@/services/Wordpress";

const Home: NextPage<{ posts: any[]; categoriesWithPosts: any[] }> = ({
  posts,
  categoriesWithPosts,
}) => {
  return (
    <>
      <Trending posts={posts} />

      {categoriesWithPosts.map((category, i) => {
        let arrangement = "one";

        if (i === 1) {
          arrangement = "three";
        } else if (i % 2 === 0) {
          arrangement = "two";
        }

        return (
          <CategoryPosts
            key={category.id}
            // @ts-ignore
            arrangement={arrangement}
            dark={i === 1}
            name={category.name}
            posts={category.posts}
          />
        );
      })}

      <MoreNews posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    const posts = await Wordpress.getAllPosts();

    await Wordpress.populatePostsImages(posts);

    const categoriesWithPosts = [];
    for (const category of layoutData.categories) {
      if (categoriesWithPosts.length === 4) break;

      const categoryPosts = await Wordpress.getCategoryPosts([category.id]);
      await Wordpress.populatePostsImages(categoryPosts);

      categoriesWithPosts.push({
        id: category.id,
        name: category.name,
        slug: category.slug,
        posts: categoryPosts,
      });
    }

    posts.forEach((post: any) => {
      const categoryId = post.categories[0];

      if (!categoryId) return;

      const category = layoutData.categories.find(
        (category: any) => category.id === categoryId
      );

      if (!category) return;

      post.category = category;
    });

    categoriesWithPosts.forEach((category: any) => {
      category.posts.forEach((post: any) => {
        const categoryId = post.categories[0];

        if (!categoryId) return;

        const category = layoutData.categories.find(
          (category: any) => category.id === categoryId
        );

        if (!category) return;

        post.category = category;
      });
    });

    return {
      props: {
        layoutData,
        posts,
        categoriesWithPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Home;
