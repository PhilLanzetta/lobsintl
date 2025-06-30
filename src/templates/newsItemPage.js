import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"
import { GatsbyImage } from "gatsby-plugin-image"
import ModuleContent from "../components/moduleContent"
import Seo from "../components/seo"

const NewsItemPage = ({ data }) => {
  const {
    showHeroImageInEntry,
    moduleContent,
    heroImage,
    headline,
    date,
    creditText,
    category,
  } = data.contentfulNewsEntry
  return (
    <Layout>
      <HideOnScroll>
        <Link to="/news">News</Link> |{" "}
        <Link to="/news" state={{ category: category }}>
          {category}
        </Link>
      </HideOnScroll>
      <div className="single-news-page">
        <h2>{headline}</h2>
        {showHeroImageInEntry && (
          <GatsbyImage
            image={heroImage.gatsbyImageData}
            alt={heroImage.description}
            className="single-news-hero"
          ></GatsbyImage>
        )}
        <div className="single-news-date-credit">
          <p>
            {new Date(
              date.replace(/-/g, "/").replace(/T.+/, "")
            ).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>{creditText}</p>
        </div>
        {moduleContent && (
          <ModuleContent moduleContent={moduleContent}></ModuleContent>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleNewsItem($slug: String) {
    contentfulNewsEntry(slug: { eq: $slug }) {
      category
      creditText
      date
      headline
      heroImage {
        gatsbyImageData
        description
        file {
          url
        }
      }
      moduleContent {
        ... on ContentfulNewsLongText {
          textId: id
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulSingleColumnImage {
          singleId: id
          title
          showCaption
          image {
            gatsbyImageData
            description
          }
          margin
        }
        ... on ContentfulTwoColumnImage {
          twoColId: id
          imageCaptions
          images {
            description
            gatsbyImageData
          }
          margin
        }
        ... on ContentfulVideoModule {
          videoId: id
          caption
          coverImage {
            description
            gatsbyImageData
          }
          margin
          vimeoLink
        }
      }
      showHeroImageInEntry
      slug
      title
    }
  }
`

export const Head = ({ data }) => (
  <Seo
    title={data.contentfulNewsEntry.title}
    image={data.contentfulNewsEntry.heroImage?.file.url}
    description={data.contentfulNewsEntry.headline}
  />
)

export default NewsItemPage
