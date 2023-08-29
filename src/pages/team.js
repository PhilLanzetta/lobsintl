import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { marked } from "marked"
import { Link } from "gatsby"
import { BsArrowRight } from "react-icons/bs"

const Team = ({ data }) => {
  const teamInfo = data.contentfulTeamPage
  const herve = data.herve
  console.log(herve)
  const teamMembers = data.allContentfulTeamMember.nodes
  const bioShortened =
    herve.teamMemberBiography.childMarkdownRemark.html.split(
      "<p>BIBLIOGRAPHY"
    )[0]
  const herveTeam = data.allContentfulTeamMember.nodes.filter(
    member => member.name === "Hervé Descottes"
  )[0]
  const careers = data.allContentfulCareerPosting.nodes

  return (
    <Layout>
      <div className="page-header">
        <Link to="/team">Team</Link> |{" "}
        <Link to="/team/#herve">Hervé Descottes</Link> |{" "}
        <Link to="/team/#teamMembers">Team Members</Link> |{" "}
        <Link to="/team/#careers">Careers</Link>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="team-page">
        <GatsbyImage
          image={teamInfo.teamPhoto.gatsbyImageData}
          alt={teamInfo.teamPhoto.description}
        ></GatsbyImage>
        <div id="herve" className="home-container">
          <Link to="/team/herve-descottes" className="home-preface-link">
            Hervé Descottes
          </Link>
          <div className="team-right">
            <Link to={herve.slug} className="team-herve-photo">
              <GatsbyImage
                image={teamInfo.hervePhoto.gatsbyImageData}
                alt={teamInfo.hervePhoto.description}
              ></GatsbyImage>
            </Link>
            <div className="herve-abbridged">
              <div dangerouslySetInnerHTML={{ __html: bioShortened }}></div>
              <Link to={herve.slug} className="home-link">
                <BsArrowRight></BsArrowRight> Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="team-members-container" id="teamMembers">
          <p className="home-preface-link">Team Members</p>
          <div className="team-location-container">
            <p className="home-preface-link">New York</p>
            <div className="head-shot-container">
              <Link to={`/team/${herveTeam.slug}`} className="head-shot">
                <GatsbyImage
                  image={herveTeam.headShot.gatsbyImageData}
                  alt={herveTeam.headShot.description}
                ></GatsbyImage>
                <div>
                  <p>{herveTeam.name}</p>
                  <p className="faded">{herveTeam.title}</p>
                </div>
              </Link>
              {teamMembers.map(member => {
                if (
                  member.primaryOffice === "New York" &&
                  member.headShot &&
                  member.name !== "Hervé Descottes"
                ) {
                  return (
                    <Link
                      to={`/team/${member.slug}`}
                      key={member.id}
                      className="head-shot"
                    >
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <div>
                        <p>{member.name}</p>
                        <p className="faded">{member.title}</p>
                      </div>
                    </Link>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
          <div className="team-location-container">
            <p className="home-preface-link">Paris</p>
            <div className="head-shot-container">
              {teamMembers.map(member => {
                if (member.primaryOffice === "Paris" && member.headShot) {
                  return (
                    <Link
                      to={`/team/${member.slug}`}
                      key={member.id}
                      className="head-shot"
                    >
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <p>{member.name}</p>
                      <p>{member.title}</p>
                    </Link>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
          <div className="team-location-container">
            <p className="home-preface-link">Seoul</p>
            <div className="head-shot-container">
              {teamMembers.map(member => {
                if (member.primaryOffice === "Seoul" && member.headShot) {
                  return (
                    <Link
                      to={`/team/${member.slug}`}
                      key={member.id}
                      className="head-shot"
                    >
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <p>{member.name}</p>
                      <p>{member.title}</p>
                    </Link>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
        </div>
        <div className="home-container" id="careers">
          <p className="home-preface-link">Careers</p>
          <div className="team-right">
            <div className="careers-container">
              <h2
                dangerouslySetInnerHTML={{
                  __html: marked.parse(teamInfo.careerPreface.careerPreface),
                }}
              ></h2>
              {careers.map(career => (
                <div key={career.id}>
                  <hr className="faded"></hr>
                  <div className="career-posting">
                    <p>{career.jobTitle}</p>
                    <Link
                      to={`/careers/${career.slug}`}
                      className="home-link career-apply"
                    >
                      <BsArrowRight></BsArrowRight> Apply Here
                    </Link>
                  </div>
                </div>
              ))}
              <hr className="faded"></hr>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulTeamPage {
      careerPreface {
        careerPreface
      }
      hervePhoto {
        gatsbyImageData
        description
      }
      teamPhoto {
        gatsbyImageData
        description
      }
    }
    herve: contentfulTeamMember(slug: { eq: "herve-descottes" }) {
      slug
      teamMemberBiography {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulTeamMember(
      filter: { primaryOffice: { ne: "No Longer Employed" } }
    ) {
      nodes {
        headShot {
          description
          gatsbyImageData
        }
        id
        name
        slug
        title
        primaryOffice
      }
    }
    allContentfulCareerPosting(sort: { postingDate: DESC }) {
      nodes {
        id
        jobTitle
        slug
      }
    }
  }
`

export default Team
