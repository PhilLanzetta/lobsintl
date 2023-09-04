import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"
import { GatsbyImage } from "gatsby-plugin-image"
import ModuleContent from "../components/moduleContent"

const NewsItemPage = ({ data }) => {
  const {
    title,
    slug,
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
        </Link>{" "}
        | <Link to={`/news${slug}`}>{title}</Link>
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
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(date))}
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
          image {
            caption
            image {
              gatsbyImageData
              description
            }
          }
          margin
        }
        ... on ContentfulTwoColumnImage {
          twoColId: id
          images {
            caption
            image {
              description
              gatsbyImageData
            }
          }
          margin
        }
      }
      showHeroImageInEntry
      slug
      title
    }
  }
`

export default NewsItemPage
