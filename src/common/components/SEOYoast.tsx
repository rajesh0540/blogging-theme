import React from "react";
import Head from "next/head";

type SEOYoastProps = {
  yoast_head_json: any;
  pagePath: string;
};

const hostedUrl = process.env.HOSTED_URL || "";

const SEOYoast: React.FC<SEOYoastProps> = ({ yoast_head_json, pagePath }) => {
  const {
    title,
    description,
    favIcon,
    canonical,
    og_locale,
    og_type,
    og_title,
    og_description,
    og_site_name,
    og_image,
    og_url,
    article_published_time,
    article_modified_time,
    author,
    twitter_misc,
    schema,
  } = yoast_head_json;

  const pageUrl = `${hostedUrl}${pagePath}`;
  const wordpressOrigin = og_url ? new URL(og_url).origin : hostedUrl;

  return (
    <Head>
      <title>{title}</title>
      
     {/* Add the Google Tag Manager code here */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-X3LT6JWW31"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X3LT6JWW31');
          `,
        }}
      ></script>
      {/* End of Google Tag Manager code */}

      {title && <meta name="title" content={title} />}
      {description && <meta name="description" content={description} />}
      {favIcon && <link rel="icon" href={favIcon} />}
      {favIcon && <link rel="apple-touch-icon" href={favIcon} />}
      <link rel="canonical" href={pageUrl} />

      {og_locale && <meta property="og:locale" content={og_locale} />}
      {og_type && <meta property="og:type" content={og_type} />}
      {og_title && <meta property="og:title" content={og_title} />}
      {og_description && (
        <meta property="og:description" content={og_description} />
      )}
      <meta property="og:url" content={pageUrl} />
      {og_site_name && <meta property="og:site_name" content={og_site_name} />}
      {og_image?.[0] && (
        <>
          <meta property="og:image" content={og_image[0].url} />
          <meta property="og:image:width" content={og_image[0].width} />
          <meta property="og:image:height" content={og_image[0].height} />
          <meta property="og:image:alt" content={title} />
          <meta property="og:image:type" content={og_image[0].type} />
        </>
      )}

      {article_published_time && (
        <meta
          property="article:published_time"
          content={article_published_time}
        />
      )}
      {article_modified_time && (
        <meta
          property="article:modified_time"
          content={article_modified_time}
        />
      )}

      {author && <meta name="author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      {og_title && <meta name="twitter:title" content={og_title} />}
      {og_description && (
        <meta name="twitter:description" content={og_description} />
      )}
      {og_image?.[0]?.url && (
        <meta name="twitter:image" content={og_image[0].url} />
      )}
      {twitter_misc
        ? Object.keys(twitter_misc).map((key, i) => (
            <>
              <meta name={`twitter:label${i + 1}`} content={key} />
              <meta name={`twitter:data${i + 1}`} content={twitter_misc[key]} />
            </>
          ))
        : null}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
              .replaceAll(canonical, pageUrl)
              .replaceAll(wordpressOrigin, hostedUrl),
          }}
        ></script>
      )}
    </Head>
  );
};

export default SEOYoast;
