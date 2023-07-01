import axiosInstacne from "@/config/axios";

//
import { CommentFormValues } from "@/common/components/CommentForm";
class Wordpress {
  static async getLayoutData() {
    const siteData = await this.getSiteData();
    const categories = await this.getAllCategories();

    return {
      siteData,
      categories: categories.map((category: any) => {
        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
        };
      }),
    };
  }

  /**
   * Auth Endpoints
   */
  static async login(credentials: { username: string; password: string }) {
    const response = await axiosInstacne.post(
      "/jwt-auth/v1/token",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    return response.data;
  }

  /**
   * Post endpoints
   */
  static async getAllPosts(limit = 10) {
    const response = await axiosInstacne.get(`/wp/v2/posts?per_page=${limit}`);

    return response.data;
  }
  static async getCategoryPosts(categories: number[], limit = 10) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?categories=${categories.join(",")}&per_page=${limit}`
    );

    return response.data;
  }
  static async getTagPosts(tags: number[]) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?tags=${tags.join(",")}`
    );

    return response.data;
  }
  static async getAuthorPosts(author: number[]) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?author=${author.join(",")}`
    );

    return response.data;
  }
  static async getPostBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/posts?slug=${slug}`);

    const post = response.data[0];

    return post;
  }
  static async populatePostsImages(posts: any[]) {
    const ids = posts.map((post) => post.featured_media).filter((id) => id);

    const response = await axiosInstacne.get(
      `/wp/v2/media?include=${ids.join(",")}&per_page=${ids.length}`
    );
    const medias = response.data;

    posts.forEach((post) => {
      if (!post.featured_media) return;

      const media = medias.find(
        (media: any) => media.id === post.featured_media
      );

      if (!media) return;

      const { thumbnail, full } = media.media_details.sizes;

      post.featured_media = full.source_url;
      post.thumbnail = thumbnail.source_url;
    });
  }

  /**
   * Category endpoints
   */
  static async getAllCategories() {
    const response = await axiosInstacne.get("/wp/v2/categories");

    return response.data;
  }
  static async getCategoryBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/categories?slug=${slug}`);

    const category = response.data[0];

    return category;
  }
  static async getCategoryById(id: number) {
    const response = await axiosInstacne.get(`/wp/v2/categories/${id}`);

    return response.data;
  }
  static async getSiteData() {
    const response = await axiosInstacne.get("/");
    const details = response.data;

    return {
      name: details.name,
      description: details.description,
    };
  }

  /**
   * Tag endpoints
   */
  static async getAllTags() {
    const response = await axiosInstacne.get("/wp/v2/tags");

    return response.data;
  }
  static async getTagBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/tags?slug=${slug}`);

    const tag = response.data[0];

    return tag;
  }

  /**
   * Media endpoints
   */
  static async getMediaById(mediaId: number) {
    const response = await axiosInstacne.get(`/wp/v2/media/${mediaId}`);

    const { thumbnail, full } = response.data.media_details.sizes;

    return {
      full: full.source_url,
      thumbnail: thumbnail.source_url,
    };
  }

  /**
   * Author endpoints
   */
  static async getAllAuthors() {
    const response = await axiosInstacne.get(`/wp/v2/users`);

    return response.data;
  }
  static async getAuthorById(authorId: number) {
    const response = await axiosInstacne.get(`/wp/v2/users/${authorId}`);

    return response.data;
  }
  static async getAuthorBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/users?slug=${slug}`);

    const author = response.data[0];

    return author;
  }

  /**
   * Comment endpoints
   */
  static async createComment(
    postId: number,
    token: string,
    comment: CommentFormValues
  ) {
    const response = await axiosInstacne.post(
      "/wp/v2/comments",
      { ...comment, post: postId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );

    return response.data;
  }
  static async getPostComments(postId: number) {
    const response = await axiosInstacne.get(`/wp/v2/comments?post=${postId}`);

    return response.data;
  }
}

export default Wordpress;
