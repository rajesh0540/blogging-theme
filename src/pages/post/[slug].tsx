import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";

// Components
import Details from "@/containers/SinglePost/Details";
import Content from "@/containers/SinglePost/Content";
import Author from "@/containers/SinglePost/Author";
import Comment from "@/containers/SinglePost/Comment";
import RelatedPosts from "@/containers/SinglePost/RelatedPosts";
import LatestPosts from "@/containers/SinglePost/LatestPosts";

//
import Wordpress from "@/services/Wordpress";

const SinglePost: NextPage<{
  post: any;
  relatedPosts: any[];
  latestPosts: any[];
}> = ({ post, relatedPosts, latestPosts }) => {
  return (
    <>
      <Details post={post} />
      <Content post={post} />
      <Author post={post} />
      <Comment post={post} />
      <RelatedPosts posts={relatedPosts} />
      <LatestPosts posts={latestPosts} />
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
    const post = await Wordpress.getPostBySlug(slug);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.featured_media) {
      const { full } = await Wordpress.getMediaById(post.featured_media);

      post.featured_media = full;
    }

    post.author = await Wordpress.getAuthorById(post.author);
    const comments = await Wordpress.getPostComments(post.id);
    post.comments = comments.map((comment: any) => {
      return {
        author_avatar: comment.author_avatar_urls[96],
        author_name: comment.author_name,
        author_url: comment.author_url,
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
      relatedPosts = await Wordpress.getCategoryPosts([postCategoryId], 4);
      await Wordpress.populatePostsImages(relatedPosts);
    }

    let latestPosts = await Wordpress.getAllPosts(4);
    await Wordpress.populatePostsImages(latestPosts);

    return {
      props: {
        layoutData,
        post,
        relatedPosts,
        latestPosts,
      },
      revalidate: 30,
    };
  } catch (e) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }
};

export default SinglePost;
