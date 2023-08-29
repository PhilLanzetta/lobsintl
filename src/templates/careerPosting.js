import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { marked } from "marked"

const CareerPosting = ({ data }) => {
  const { jobTitle, postingDate, jobDescription, image } =
    data.contentfulCareerPosting
  return (
    <Layout>
      <div className="page-header">
        <span>Careers</span> | <span>{jobTitle}</span>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="team-member-container">
        <div className="team-member-info">
          <div className="team-member-photo-container">
            {image && (
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.description}
              ></GatsbyImage>
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
      }
    }
  }
`

export default CareerPosting
