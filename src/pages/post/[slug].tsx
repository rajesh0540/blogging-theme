import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

// Components
import SEOYoast from "@/common/components/SEOYoast";
import Wrapper from "@/common/components/Wrapper";

// Containers
import Details from "@/containers/SinglePost/Details";
import Content from "@/containers/SinglePost/Content";
import Author from "@/containers/SinglePost/Author";
import Comment from "@/containers/SinglePost/Comment";
import RelatedPosts from "@/containers/SinglePost/RelatedPosts";
import LatestPosts from "@/containers/SinglePost/LatestPosts";
import Sidebar from "@/containers/SinglePost/Sidebar";

//
import Wordpress from "@/services/Wordpress";
import optimizeImage from "@/utils/functions/optimizeImage";

const resultsPerPage = 4;

const SinglePost: NextPage<{
  layoutData: any;
  post: any;
  relatedPosts: any[];
  latestPosts: any[];
}> = ({ layoutData, post, relatedPosts, latestPosts }) => {
  const { site_icon } = layoutData.siteData;
  post.yoast_head_json.favIcon = site_icon.src;

  return (
    <>
      {post.yoast_head_json && (
        <SEOYoast
          yoast_head_json={post.yoast_head_json}
          pagePath={`/post/${post.slug}/`}
        />
      )}
      <Wrapper size="small">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 mb-[40px]">
          <div className="lg:col-span-2">
            <Details post={post} />
            <Content post={post} />
            <Author post={post} />
            <Comment post={post} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar latestPosts={latestPosts} popularPosts={[]} />
          </div>
        </div>
      </Wrapper>
      <RelatedPosts
        posts={relatedPosts}
        categoryId={post.categories[0]}
        resultsPerPage={resultsPerPage}
      />
      <LatestPosts posts={latestPosts} resultsPerPage={resultsPerPage} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await Wordpress.getAllPosts(99);

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          slug: post.slug,
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
    const post = await Wordpress.getPostBySlug(slug);

    if (!post) {
      throw new Error("Post not found");
    }

    await Wordpress.populatePostsImages([post], optimizeImage);

    post.author = await Wordpress.getAuthorById(post.author);
    const comments = await Wordpress.getPostComments(post.id);
    post.comments = comments.map((comment: any) => {
      return {
        id: comment.id,
        author_avatar: comment.author_avatar_urls[96],
        author_name: comment.author_name,
        date: comment.date,
        content: comment.content.rendered,
      };
    });

    const postCategoryId = post.categories[0];
    if (postCategoryId) {
      post.category = await Wordpress.getCategoryById(postCategoryId);
    }

    /**
     * Fetching related posts
     */
    let relatedPosts = [];
    if (postCategoryId) {
      relatedPosts = await Wordpress.getCategoryPosts(
        [postCategoryId],
        resultsPerPage
      );
      await Wordpress.populatePostsImages(relatedPosts, optimizeImage);
    }

    let latestPosts = await Wordpress.getAllPosts(resultsPerPage);
    await Wordpress.populatePostsImages(latestPosts, optimizeImage);

    return {
      props: {
        layoutData,
        post,
        relatedPosts,
        latestPosts,
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

export default SinglePost;
