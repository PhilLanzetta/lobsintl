import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import ProjectGrid from "../components/projectGrid"
import { Fade } from "react-awesome-reveal"
import HideOnScroll from "../components/hideOnScroll"
import Seo from "../components/seo"

const TeamMember = ({ data }) => {
  const { name, title, headShot, project, bio } = data.contentfulTeamMember

  const endsInS = name.charAt(name.length - 1) === "s"

  const orderedProjects = project?.slice().sort((a, b) => (a.year < b.year ? 1 : -1))

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/team">Team</Link> |{" "}
        <Link to="/team#teamMembers">Team Members</Link> | {name}
      </HideOnScroll>
      <div className="team-member-container">
        <div className="team-member-info">
          <div className="team-member-photo-container">
            <Fade triggerOnce={true}>
              {headShot && (
                <GatsbyImage
                  image={headShot.gatsbyImageData}
                  alt={headShot.description}
                ></GatsbyImage>
              )}
            </Fade>
          </div>
          <div className="team-member-text">
            <div className="team-member-heading">
              <Fade triggerOnce={true}>
                <h1>{name}</h1>
                <h2>{title}</h2>
              </Fade>
            </div>
            {bio && (
              <Fade triggerOnce={true}>
                <div
                  className="team-member-bio"
                  dangerouslySetInnerHTML={{
                    __html: bio.childMarkdownRemark.html,
                  }}
                ></div>
              </Fade>
            )}
          </div>
        </div>
        {name === "Hervé Descottes"
          ? ""
          : orderedProjects?.length > 0 && (
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
        file {
          url
        }
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

export const Head = ({ data }) => (
  <Seo
    title={data.contentfulTeamMember.name}
    image={data.contentfulTeamMember.headShot?.file.url}
    keywords={`${data.contentfulTeamMember.name}, ${data.contentfulTeamMember.title}`}
  />
)

export default TeamMember
