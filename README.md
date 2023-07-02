# Wordpress Integration

First of all install a fresh copy of wordpress on server you can download wordpress from here https://wordpress.org/latest.zip.

## Plugin Installation

After downloading and installing Wordpress you have to install following plugins:

- **JWT Authentication for WP-API:** https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/.  
  JWT plugin is used to extend the headless REST API to add authentication routes. These will allow the theme to submit comments.

- **Web Stories:** https://wordpress.org/plugins/web-stories/.  
  Allow you to integrate Google web stories and these will be displayed on the home page of theme.

- **Yoast SEO:** https://wordpress.org/plugins/wordpress-seo/.  
  To generate meta tags and configure SEO for the theme.

## Site Identity

Once done with insalling necessary plugins, Second step you have to take is to upload your site logo and site icon. You have to follow these steps:

1. Go to following route on your wordpress website **/wp-admin/customize.php**.
2. Select **Site Identity** on the left sidebar.
3. Click on **Select site icon** and select your site icon.
4. Go to following route on your wordpress website **/wp-admin/site-editor.php**.
5. Select **Template parts** for left sidebar.
6. Select **Header**.
7. Add new block and select **Site Logo**.

## Add Trending Category

Create a new wordpress category for trending posts. After just remember the ID for newly created category.

## Theme Linking

To link the theme with your wordpress follow these steps:

1. Extract theme files.
2. Install packages by running `npm install`.
3. Provide following environment variables.

```
WORDRESS_USERNAME =
WORDPRESS_PASSWORD =
WORDPRESS_URL =
WORDPRESS_URL_DOMAIN =
WORDPRESS_JSON_URL =
TRENDING_CATEGORY_ID =
HOSTED_URL =
```

4. Create build by running `npm run build`.
5. Server build by running `npm start`.

And we are good to go. We have successfully installed and configured wordpress and linked it with our headless theme.
