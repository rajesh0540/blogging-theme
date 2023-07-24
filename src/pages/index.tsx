import React from "react";
import { GetStaticProps, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";
import WebStories from "@/common/layout/WebStories";

// Containers
import Trending from "@/containers/Home/Trending";
import CategoryPosts, {
  CategoryPostsArrangements,
} from "@/containers/Home/CategoryPosts";
import MoreNews from "@/containers/Home/MoreNews";

//
import Wordpress from "@/services/Wordpress";
import optimizeImage from "@/utils/functions/optimizeImage";

let resultsPerPage = 9;
const trendingCategoryId = Number(process.env.TRENDING_CATEGORY_ID);
const featuredCategoryId = Number(process.env.FEATURED_CATEGORY_ID);

const Home: NextPage<{
  layoutData: any;
  posts: any[];
  categoriesWithPosts: any[];
  featuredPosts: any[];
  trendingPosts: any[];
  seo: any;
}> = ({
  layoutData,
  posts = [],
  categoriesWithPosts,
  featuredPosts = [],
  trendingPosts = [],
  seo,
}) => {
  const webStories = layoutData.webStories;
  const { name, description, site_icon } = layoutData.siteData;
  const { schema, canonical, og_url } = seo;

  return (
    <>
      <SEOYoast
        yoast_head_json={{
          title: `${name}`,
          description,
          favIcon: site_icon.src,
          og_locale: "en_US",
          og_type: "website",
          og_title: `${name}`,
          og_description: description,
          og_site_name: name,
          canonical,
          og_url,
          schema,
        }}
        pagePath="/"
      />
      {webStories?.length > 0 && <WebStories webStories={webStories} />}

      <Trending
        trendingPosts={trendingPosts}
        featuredPosts={featuredPosts}
        posts={posts}
      />
      {categoriesWithPosts.map((category, i) => {
        let arrangement: CategoryPostsArrangements = "one";

        if (i === 1) {
          arrangement = "three";
        } else if (i % 2 === 0) {
          arrangement = "two";
        }

        return (
          <CategoryPosts
            key={category.id}
            arrangement={arrangement}
            dark={i === 1}
            name={category.name}
            posts={category.posts}
          />
        );
      })}

      <MoreNews posts={posts} resultsPerPage={resultsPerPage} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const layoutData = await Wordpress.getLayoutData();
    const posts = await Wordpress.getAllPosts(resultsPerPage);

    await Wordpress.populatePostsImages(posts, optimizeImage);

    const categoriesWithPosts = [];
    for (const category of layoutData.categories) {
      if (categoriesWithPosts.length === 4) break;
      if ([trendingCategoryId, featuredCategoryId].includes(category.id)) {
        continue;
      }

      const categoryPosts = await Wordpress.getCategoryPosts([category.id]);
      await Wordpress.populatePostsImages(categoryPosts, optimizeImage);

      categoriesWithPosts.push({
        id: category.id,
        name: category.name,
        slug: category.slug,
        posts: categoryPosts,
      });
    }

    for (const story of layoutData.webStories) {
      const posterUrl = story.poster?.url;

      if (posterUrl) {
        const { placeholder } = await optimizeImage({ src: posterUrl });
        story.poster.placeholder = placeholder;
      }
    }

    let trendingPosts = [];
    if (trendingCategoryId) {
      trendingPosts = await Wordpress.getCategoryPosts([trendingCategoryId], 5);
      await Wordpress.populatePostsImages(trendingPosts, optimizeImage);
    }

    let featuredPosts = [];
    if (featuredCategoryId) {
      featuredPosts = await Wordpress.getCategoryPosts([featuredCategoryId], 3);
      await Wordpress.populatePostsImages(featuredPosts, optimizeImage);
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
        post.category = {
          name: category.name,
          slug: category.slug,
        };
      });
    });

    const seo = await Wordpress.getPageSchema(
      `${process.env.WORDPRESS_URL}/` as string
    );

    return {
      props: {
        layoutData,
        posts,
        categoriesWithPosts,
        featuredPosts,
        trendingPosts,
        seo,
      },
      revalidate: 1800,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Home;
