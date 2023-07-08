import axios from "axios";

//
import { CommentFormValues } from "@/common/components/CommentForm";
import type { OptimizeImage } from "@/utils/functions/optimizeImage";

const wordpressJsonUrl = process.env.WORDPRESS_JSON_URL || "";
const wordpressUsername = process.env.WORDRESS_USERNAME || "";
const wordpressPassword = process.env.WORDPRESS_PASSWORD || "";
const headerMenuId = Number(process.env.HEADER_MENU_ID);
const footerMenuId = Number(process.env.FOOTER_MENU_ID);
const wordpressUrl = process.env.WORDPRESS_URL;

const axiosInstacne = axios.create({
  baseURL: wordpressJsonUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

const trendingCategoryId = Number(process.env.TRENDING_CATEGORY_ID);
class Wordpress {
  static async getLayoutData() {
    const globalAny: any = global;

    if (globalAny.layoutCache) {
      return globalAny.layoutCache;
    }

    const login = await this.login({
      username: wordpressUsername,
      password: wordpressPassword,
    });

    const siteData = await this.getSiteData();
    const categories = await this.getAllCategories(99);
    const webStories = await this.getAllWebStories(99);

    let headerMenu = [];
    if (headerMenuId) {
      headerMenu = await this.getMenu(headerMenuId, login.token);
    }

    let footerMenu = [];
    if (footerMenuId) {
      footerMenu = await this.getMenu(footerMenuId, login.token);
    }

    const layoutData = {
      siteData,
      categories: categories
        .filter((category: any) => {
          return category.count && category.id !== trendingCategoryId;
        })
        .map((category: any) => {
          return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
          };
        }),
      webStories: webStories.map((story: any) => {
        return {
          poster: story.story_poster || null,
          slug: story.slug,
          web_story_category: story.web_story_category,
          title: story.title.rendered,
        };
      }),
      headerMenu,
      footerMenu,
    };

    globalAny.layoutCache = layoutData;

    return layoutData;
  }
  static async getIndexSitemap() {
    const sitemap = await axiosInstacne.get("/../sitemap_index.xml");

    return sitemap.data;
  }
  static async getSitemap(fileName: string) {
    const sitemap = await axiosInstacne.get(`/../${fileName}`);

    return sitemap.data;
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
  static async getAllPosts(limit = 10, page = 1) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?per_page=${limit}&page=${page}`
    );

    return response.data;
  }
  static async searchPosts(query: string) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?search=${query}&search_columns=post_title&per_page=9`
    );

    return response.data;
  }
  static async getCategoryPosts(categories: number[], limit = 10, page = 1) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?categories=${categories.join(
        ","
      )}&per_page=${limit}&page=${page}`
    );

    return response.data;
  }
  static async getTagPosts(tags: number[], limit = 10, page = 1) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?tags=${tags.join(",")}&per_page=${limit}&page=${page}`
    );

    return response.data;
  }
  static async getAuthorPosts(author: number[], limit = 10, page = 1) {
    const response = await axiosInstacne.get(
      `/wp/v2/posts?author=${author.join(",")}&per_page=${limit}&page=${page}`
    );

    return response.data;
  }
  static async getPostBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/posts?slug=${slug}`);

    const post = response.data[0];

    return post;
  }
  static async populatePostsImages(
    posts: any[],
    optimizeImage?: OptimizeImage
  ) {
    const noImage = {
      full: {
        src: "/no-image.jpg",
        height: 200,
        width: 223,
        placeholder: "",
      },
      thumbnail: {
        src: "/no-image.jpg",
        height: 200,
        width: 223,
        placeholder: "",
      },
      alt: "No image found",
    };

    const ids = posts.map((post) => post.featured_media).filter((id) => id);

    let medias = [];

    if (ids.length > 0) {
      const response = await axiosInstacne.get(
        `/wp/v2/media?include=${ids.join(",")}&per_page=${ids.length}`
      );
      medias = response.data;
    }

    for (const post of posts) {
      if (!post.featured_media) {
        post.featured_media = noImage;
        continue;
      }

      const media = medias.find(
        (media: any) => media.id === post.featured_media
      );

      if (!media) {
        post.featured_media = noImage;
        continue;
      }

      const { thumbnail, full } = media.media_details.sizes;

      const fullOptimized = await optimizeImage?.({ src: full.source_url });
      const thumbnailOptimized = await optimizeImage?.({
        src: thumbnail.source_url,
      });

      post.featured_media = {
        full: {
          src: full.source_url,
          height: full.height,
          width: full.width,
          placeholder: fullOptimized?.placeholder || "",
        },
        thumbnail: {
          src: thumbnail.source_url,
          height: thumbnail.height,
          width: thumbnail.width,
          placeholder: thumbnailOptimized?.placeholder || "",
        },
        alt: media.alt_text,
      };
    }
  }

  /**
   * Category endpoints
   */
  static async getAllCategories(limit = 10) {
    const response = await axiosInstacne.get(
      `/wp/v2/categories?per_page=${limit}`
    );

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

    let site_icon = {
      src: "",
      height: 0,
      width: 0,
    };
    let site_logo = {
      src: "",
      height: 0,
      width: 0,
    };

    if (details.site_icon) {
      const response = await axiosInstacne.get(
        `/wp/v2/media/${details.site_icon}`
      );
      const { source_url, width, height } =
        response.data.media_details.sizes["site_icon-32"];

      site_icon.src = source_url;
      site_icon.height = height;
      site_icon.width = width;
    }

    if (details.site_logo) {
      const response = await axiosInstacne.get(
        `/wp/v2/media/${details.site_logo}`
      );
      const { source_url, width, height } =
        response.data.media_details.sizes.full;

      site_logo.src = source_url;
      site_logo.height = height;
      site_logo.width = width;
    }

    return {
      name: details.name,
      description: details.description,
      url: details.url,
      site_logo,
      site_icon,
    };
  }

  /**
   * Tag endpoints
   */
  static async getAllTags(limit = 10) {
    const response = await axiosInstacne.get(`/wp/v2/tags?per_page=${limit}`);

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
    const {
      caption: { rendered },
      alt_text,
    } = response.data;

    return {
      full: full.source_url,
      thumbnail: thumbnail.source_url,
      caption: rendered,
      alt: alt_text,
    };
  }

  /**
   * Author endpoints
   */
  static async getAllAuthors(limit = 10) {
    const response = await axiosInstacne.get(`/wp/v2/users?per_page=${limit}`);

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

  /**
   * Web stories endpoints
   */
  static async getAllWebStories(limit = 10) {
    try {
      const response = await axiosInstacne.get(
        `/web-stories/v1/web-story?per_page=${limit}`
      );

      return response.data;
    } catch (e) {
      return [];
    }
  }
  static async getAllWebStoryCategories(limit = 10) {
    try {
      const response = await axiosInstacne.get(
        `/web-stories/v1/web_story_category?per_page=${limit}`
      );

      return response.data;
    } catch (e) {
      return [];
    }
  }
  static async getWebStoryBySlug(slug: string) {
    try {
      const response = await axiosInstacne.get(
        `/web-stories/v1/web-story?slug=${slug}`
      );

      return response.data[0];
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Yoast Endpoints
   */
  static async getPageSchema(url: string) {
    const response = await axiosInstacne.get(
      `/yoast/v1/get_head?url=${encodeURIComponent(url)}`
    );

    const { schema, canonical, og_url } = response.data.json;

    return {
      schema,
      canonical,
      og_url,
    };
  }

  /**
   * Page Endpoints
   */
  static async getAllPages() {
    const response = await axiosInstacne.get(`/wp/v2/pages`);

    const post = response.data;

    return post;
  }
  static async getPageBySlug(slug: string) {
    const response = await axiosInstacne.get(`/wp/v2/pages?slug=${slug}`);

    const post = response.data[0];

    return post;
  }

  /**
   * Menu Endpoints
   */
  static async getMenu(menuId: number, token: string) {
    const response = await axiosInstacne.get(
      `/wp/v2/menu-items?menus=${menuId}&per_page=99`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );

    const menuItems = response.data.map((item: any) => {
      const wpPath = item.url.replace(wordpressUrl, "");

      let path = "/";

      if (item.object === "page") {
        const [_, slug] = wpPath.split("/");

        path = `/page/${slug}`;
      } else if (item.object === "custom") {
        path = wpPath;
      } else if (item.object === "category") {
        const [_, _2, _3, slug] = wpPath.split("/");

        path = `/category/${slug}`;
      } else if (item.object === "post") {
        const [_, _2, slug] = wpPath.split("/");

        path = `/${slug}`;
      }

      return {
        id: item.id,
        title: item.title.rendered,
        menu_order: item.menu_order,
        parent: item.parent,
        url: path,
      };
    });

    for (const item of menuItems) {
      item.children = [];

      menuItems.forEach((child: any) => {
        if (child.parent === item.id) {
          item.children.push(child);
        }
      });
    }

    return menuItems;
  }
}

export default Wordpress;
