require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `L'Observatoire`,
    description: `Lighting designer`,
    author: `@pacific`,
    siteUrl: `https://lobservatoire.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-dark-mode`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `L'Observatoire`,
        short_name: `L'Observatoire`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/LO_icon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `7mbidstwva6z`,
        accessToken: process.env.CONTENTFUL_API_KEY,
        enableTags: true,
      },
    },
  ],
}
