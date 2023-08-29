import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import ProjectGrid from "../components/projectGrid"

const TeamMember = ({ data }) => {
  const { name, title, headShot, project, bio } = data.contentfulTeamMember

  const endsInS = name.charAt(name.length - 1) === "s"

  const orderedProjects = project?.sort((a, b) => (a.year < b.year ? 1 : -1))

  return (
    <Layout>
      <div className="page-header">
        <Link to="/team">Team</Link> |{" "}
        <Link to="/team#teamMembers">Team Members</Link> | {name}
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="team-member-container">
        <div className="team-member-info">
          <div className="team-member-photo-container">
            {headShot && (
              <GatsbyImage
                image={headShot.gatsbyImageData}
                alt={headShot.description}
              ></GatsbyImage>
            )}
          </div>
          <div className="team-member-text">
            <div className="team-member-heading">
              <h1>{name}</h1>
              <h2>{title}</h2>
            </div>
            {bio && (
              <div
                className="team-member-bio"
                dangerouslySetInnerHTML={{
                  __html: bio.childMarkdownRemark.html,
                }}
              ></div>
            )}
          </div>
        </div>
        {orderedProjects.length > 0 && (
          <div className="team-member-project-container">
            <p className="upper team-member-project-preface">{`${name}${
              endsInS ? "'" : "'s"
            } projects`}</p>
            <ProjectGrid projects={orderedProjects} team></ProjectGrid>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleTeamMember($slug: String) {
    contentfulTeamMember(slug: { eq: $slug }) {
      headShot {
        gatsbyImageData
        description
      }
      project {
        id
        projectName
        heroImage {
          gatsbyImageData(width: 400)
          description
        }
        typology
        city
        country
        geographicRegion
        slug
        year
      }
      bio: teamMemberBiography {
        childMarkdownRemark {
          html
        }
      }
      title
      name
    }
  }
`

export default TeamMember
