import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { marked } from "marked"
import { Fade } from "react-awesome-reveal"
import HideOnScroll from "../components/hideOnScroll"
import Seo from "../components/seo"
import Slider from "react-slick"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        className="hero-svg"
      >
        <path
          id="Path_118"
          data-name="Path 118"
          d="M0,8,5.436,0,11,8"
          transform="translate(19.688 9.5) rotate(90)"
          fill="none"
        />
        <g id="Ellipse_184" data-name="Ellipse 184" fill="none">
          <circle cx="15" cy="15" r="14.5" />
        </g>
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        className="hero-svg"
      >
        <path
          id="Path_118"
          data-name="Path 118"
          d="M0,0,5.436,8,11,0"
          transform="translate(18.313 9.5) rotate(90)"
          fill="none"
        />
        <g id="Ellipse_184" data-name="Ellipse 184" fill="none">
          <circle cx="15" cy="15" r="14.5" />
        </g>
      </svg>
    </div>
  )
}

const CareerPosting = ({ data }) => {
  const { jobTitle, postingDate, jobDescription, image, additionalImages } =
    data.contentfulCareerPosting

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    useTransform: false,
    nextArrow: <NextArrow addClassName="next-button" />,
    prevArrow: <PrevArrow addClassName="prev-button" />,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    fade: true,
  }

  return (
    <Layout>
      <HideOnScroll>
        <span>Careers</span> | <span>{jobTitle}</span>
      </HideOnScroll>
      <Fade triggerOnce={true}>
        <div className="team-member-container">
          <div className="team-member-info">
            <div className="team-member-photo-container">
              {image && !additionalImages?.length && (
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.description}
                ></GatsbyImage>
              )}
              {image && additionalImages?.length && (
                <Slider {...settings}>
                  <GatsbyImage
                    image={image.gatsbyImageData}
                    alt={image.description}
                  ></GatsbyImage>
                  {additionalImages.map((image, index) => (
                    <GatsbyImage
                      key={index}
                      image={image.gatsbyImageData}
                      alt={image.description}
                    ></GatsbyImage>
                  ))}
                </Slider>
              )}
            </div>
            <div className="team-member-text">
              <div className="team-member-heading">
                <h1>{jobTitle}</h1>
                <h2>{new Date(postingDate).toLocaleDateString("en-us")}</h2>
              </div>
              {jobDescription && (
                <div
                  className="team-member-bio"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(jobDescription.jobDescription),
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </Layout>
  )
}

export const query = graphql`
  query getSingleCareerPosting($slug: String) {
    contentfulCareerPosting(slug: { eq: $slug }) {
      id
      jobTitle
      postingDate
      jobDescription {
        jobDescription
      }
      image {
        description
        gatsbyImageData
        height
        width
        file {
          url
        }
      }
      additionalImages {
        description
        gatsbyImageData
        height
        width
        file {
          url
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo
    title={data.contentfulCareerPosting.jobTitle}
    image={data.contentfulCareerPosting.image.file.url}
    keywords={`${data.contentfulCareerPosting.jobTitle}`}
  />
)

export default CareerPosting
