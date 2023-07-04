import Wordpress from "@/services/Wordpress";

const hostedUrl = process.env.HOSTED_URL;

export const blogFeed = async () => {
  const { name, description, site_icon } = await Wordpress.getSiteData();

  const posts = await Wordpress.getAllPosts(99);
  const authors = await Wordpress.getAllAuthors(99);
  const categories = await Wordpress.getAllCategories(99);
  const tags = await Wordpress.getAllTags(99);

  return `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0" >
    <channel>
        <title>${name}</title>
        <atom:link href="${hostedUrl}/feed/" rel="self" type="application/rss+xml"/>
        <link>${hostedUrl}/</link>
        <description>${description}</description>
        <language>en-US</language>
        <image>
            <url>${site_icon.src}</url>
            <title>${name}</title>
            <link>${hostedUrl}/</link>
            <width>${site_icon.width}</width>
            <height>${site_icon.height}</height>
        </image>
        ${posts
          .map((post: any) => {
            const postUrl = `${hostedUrl}/${post.slug}`;
            const author = authors.find(
              (author: any) => author.id === post.author
            );
            const commentCount =
              post.yoast_head_json.schema["@graph"][0].commentCount;

            return `<item>
            <title>${post.title.rendered}</title>
            <link>${postUrl}/</link>
            <comments>${postUrl}#comments</comments>
            <dc:creator>
                <![CDATA[ ${author.name} ]]>
            </dc:creator>
            <pubDate>${post.date}</pubDate>
            ${post.categories
              .map((categoryId: any) => {
                const category = categories.find(
                  (cat: any) => cat.id === categoryId
                );

                return `<category>
                <![CDATA[ ${category.name} ]]>
            </category>`;
              })
              .join("\n          ")}
            ${post.tags
              .map((tagId: any) => {
                const tag = tags.find((tag: any) => tag.id === tagId);

                return `<category>
                <![CDATA[ ${tag.name} ]]>
            </category>`;
              })
              .join("\n          ")}
            <guid isPermaLink="false">${postUrl}/</guid>
            <description>
                <![CDATA[ ${post.excerpt.rendered} ]]>
            </description>
            <content:encoded>
                <![CDATA[ ${post.content.rendered} ]]>
            </content:encoded>
            <wfw:commentRss>${postUrl}/feed/</wfw:commentRss>
            <slash:comments>${commentCount}</slash:comments>
        </item>`;
          })
          .join("\n        ")}
    </channel>
</rss>`;
};

export const commentFeed = async (slug: string) => {
  const post = await Wordpress.getPostBySlug(slug);
  const comments = await Wordpress.getPostComments(post.id);
  const siteData = await Wordpress.getSiteData();

  const postUrl = `${hostedUrl}/${slug}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
    <channel>
      <title>Comments on: ${post.title.rendered}</title>
      <atom:link href="${postUrl}/feed/" rel="self" type="application/rss+xml" />
      <link>${postUrl}</link>
      <description>${siteData.description}</description>
      <lastBuildDate>${post.date}</lastBuildDate>
      ${comments
        .map((comment: any) => {
          return `<item>
        <title>By: ${comment.author_name}</title>
        <link>${postUrl}#comment-${comment.id}</link>
        <dc:creator>
          <![CDATA[ ${comment.author_name} ]]>
        </dc:creator>
        <pubDate>${comment.date}</pubDate>
        <guid isPermaLink="false">${postUrl}#comment-${comment.id}</guid>
        <description>
          <![CDATA[ ${comment.content.rendered} ]]>
        </description>
        <content:encoded>
          <![CDATA[ ${comment.content.rendered} ]]>
        </content:encoded>
      </item>`;
        })
        .join("\n      ")}
    </channel>
</rss>`;
};
