import React from "react"
import { graphql, Link } from "gatsby"
import { marked } from "marked"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { BsArrowRight } from "react-icons/bs"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const About = ({ data }) => {
  const {
    designApproach,
    featuredProjects,
    headline,
    whoWeAre,
    whoWeAreImage,
    philosophy,
  } = data.contentfulAboutLObservatoire

  const awards = data.allContentfulAward.nodes

  const books = data.allContentfulBook.nodes

  const firstHighlights = featuredProjects.slice(0, 3)
  const secondHighlights = featuredProjects.slice(3)

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/about/#top">About</Link> |{" "}
        <Link to="/about/#who">Who we are</Link> |{" "}
        <Link to="/about/#philosophy">Our philosophy</Link> |{" "}
        <Link to="/about/#approach">Design approach</Link> |{" "}
        <Link to="/about/#awards">Awards</Link> |{" "}
        <Link to="/about/#books">Books</Link>
      </HideOnScroll>
      <div className="about-page">
        <Fade triggerOnce={true}>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(headline.headline),
            }}
            className="about-page-headline"
            id="top"
          ></div>
        </Fade>
        <div className="about-featured">
          {firstHighlights.map((item, index) => (
            <Fade
              triggerOnce={true}
              key={index}
              className="about-featured-link"
            >
              <div>
                <GatsbyImage
                  image={item.heroImage.gatsbyImageData}
                  alt={item.heroImage.description}
                  className="about-featured-image"
                ></GatsbyImage>
                <p>{item.projectName}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="anchor-margin" id="who"></div>
          <div className="home-container about-section">
            <p className="home-preface-link">Who We Are</p>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(whoWeAre.whoWeAre),
              }}
              className="home-right about-text"
            ></div>
          </div>
          <div className="about-featured-link sierras">
            <GatsbyImage
              image={whoWeAreImage.image.gatsbyImageData}
              alt={whoWeAreImage.image.description}
              className="about-featured-image"
            ></GatsbyImage>
            <p>{whoWeAreImage.caption}</p>
          </div>
        </Fade>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="anchor-margin" id="philosophy"></div>
          <div className="home-container about-section">
            <p className="home-preface-link">Our Philosophy</p>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(philosophy.philosophy),
              }}
              className="home-right about-text"
            ></div>
          </div>
        </Fade>
        <div className="about-featured">
          {secondHighlights.map((item, index) => (
            <Fade
              triggerOnce={true}
              className="about-featured-link"
              key={index}
            >
              <div>
                <GatsbyImage
                  image={item.heroImage.gatsbyImageData}
                  alt={item.heroImage.description}
                  className="about-featured-image"
                ></GatsbyImage>
                <p>{item.projectName}</p>
              </div>
            </Fade>
          ))}
        </div>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="anchor-margin" id="approach"></div>
          <div className="home-container about-section">
            <p className="home-preface-link">Our Design Approach</p>
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(designApproach.designApproach),
              }}
              className="home-right about-text"
            ></div>
          </div>
        </Fade>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="anchor-margin" id="awards"></div>
          <div className="home-container about-section">
            <p className="home-preface-link">Awards</p>
            <div className="home-right about-awards">
              <h2>Our most recent awards</h2>
              <div className="about-awards-container">
                {awards.map(award => (
                  <div key={award.id}>
                    <hr className="faded"></hr>
                    <div className="about-award">
                      <div>
                        <p className="upper">{award.awardName}</p>
                        {award.project?.length && (
                          <p>{award.project[0].projectName}</p>
                        )}
                      </div>
                      <p className="faded">{award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="faded"></hr>
              <Link to="/awards" className="home-link">
                <BsArrowRight></BsArrowRight> See All
              </Link>
            </div>
          </div>
        </Fade>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="anchor-margin" id="books"></div>
          <div className="home-container about-section">
            <p className="home-preface-link">Books</p>
            <div className="home-right about-books">
              {books.map(book => (
                <div key={book.id} className="about-book-container">
                  <GatsbyImage
                    image={book.bookImage.gatsbyImageData}
                    alt={book.bookImage.description}
                  ></GatsbyImage>
                  <p>
                    {book.publisher}, {book.publicationYear}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(book.description.description),
                    }}
                  ></div>
                  <a
                    href={book.purchaseLink}
                    target="_blank"
                    rel="noreferrer"
                    className="home-link"
                  >
                    <BsArrowRight></BsArrowRight>Order Here
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutLObservatoire {
      designApproach {
        designApproach
      }
      featuredProjects {
        heroImage {
          description
          gatsbyImageData
        }
        id
        projectName
        slug
      }
      headline {
        headline
      }
      whoWeAre {
        whoWeAre
      }
      whoWeAreImage {
        image {
          description
          gatsbyImageData
        }
        caption
      }
      philosophy {
        philosophy
      }
    }
    allContentfulAward(limit: 4, sort: { year: DESC }) {
      nodes {
        awardName
        project {
          projectName
        }
        year
        id
      }
    }
    allContentfulBook(sort: { publicationYear: DESC }) {
      nodes {
        id
        description {
          description
        }
        publicationYear
        publisher
        purchaseLink
        bookImage {
          id
          gatsbyImageData
          description
        }
      }
    }
  }
`
export const Head = () => <Seo title="About" />

export default About
