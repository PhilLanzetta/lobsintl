import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { marked } from "marked"
import { Link } from "gatsby"
import { BsArrowRight } from "react-icons/bs"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const Team = ({ data }) => {
  const teamInfo = data.contentfulTeamPage
  const herve = data.herve
  const bioShortened =
    herve.teamMemberBiography.childMarkdownRemark.html.split(
      "<p>BIBLIOGRAPHY"
    )[0]
  const careers = data.allContentfulCareerPosting.nodes
  const nyTeam = data.contentfulTeamPage.nyTeam
  const parisTeam = data.contentfulTeamPage.parisTeam
  const seoulTeam = data.contentfulTeamPage.seoulTeam
  const londonTeam = data.contentfulTeamPage.londonTeam

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/team">Team</Link> |{" "}
        <Link to="/team/#herve">Hervé Descottes</Link> |{" "}
        <Link to="/team/#teamMembers">Team Members</Link> |{" "}
        <Link to="/team/#careers">Careers</Link>
      </HideOnScroll>
      <div className="team-page">
        <GatsbyImage
          image={teamInfo.teamPhoto.gatsbyImageData}
          alt={teamInfo.teamPhoto.description}
        ></GatsbyImage>
        <div className="anchor-margin" id="herve"></div>
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="home-container">
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
        </Fade>
        <div className="anchor-margin-big" id="teamMembers"></div>
        <Fade triggerOnce={true}>
          <div className="team-members-container">
            <p className="home-preface-link">Team Members</p>
            <div className="team-location-container">
              <p className="home-preface-link">New York</p>
              <div className="head-shot-container">
                {nyTeam.map(member => (
                  <Link
                    to={`/team/${member.slug}`}
                    key={member.id}
                    className="head-shot"
                  >
                    <Fade triggerOnce={true}>
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <div>
                        <p>{member.name}</p>
                        <p className="faded">{member.title}</p>
                      </div>
                    </Fade>
                  </Link>
                ))}
              </div>
            </div>
            <Fade triggerOnce={true}>
              <div className="team-location-container">
                <p className="home-preface-link">Paris</p>
                <div className="head-shot-container">
                  {parisTeam.map(member => (
                    <Link
                      to={`/team/${member.slug}`}
                      key={member.id}
                      className="head-shot"
                    >
                      <Fade triggerOnce={true}>
                        <GatsbyImage
                          image={member.headShot.gatsbyImageData}
                          alt={member.headShot.description}
                        ></GatsbyImage>
                        <p>{member.name}</p>
                        <p>{member.title}</p>
                      </Fade>
                    </Link>
                  ))}
                </div>
              </div>
            </Fade>
            <div className="team-location-container">
              <p className="home-preface-link">Seoul</p>
              <div className="head-shot-container">
                {seoulTeam.map(member => (
                  <Link
                    to={`/team/${member.slug}`}
                    key={member.id}
                    className="head-shot"
                  >
                    <Fade triggerOnce={true}>
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <p>{member.name}</p>
                      <p>{member.title}</p>
                    </Fade>
                  </Link>
                ))}
              </div>
            </div>
            <div className="team-location-container">
              <p className="home-preface-link">London</p>
              <div className="head-shot-container">
                {londonTeam.map(member => (
                  <Link
                    to={`/team/${member.slug}`}
                    key={member.id}
                    className="head-shot"
                  >
                    <Fade triggerOnce={true}>
                      <GatsbyImage
                        image={member.headShot.gatsbyImageData}
                        alt={member.headShot.description}
                      ></GatsbyImage>
                      <p>{member.name}</p>
                      <p>{member.title}</p>
                    </Fade>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Fade>
        <div className="anchor-margin" id="careers"></div>
        <Fade triggerOnce={true}>
          <div className="home-container">
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
        </Fade>
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
        file {
          url
        }
      }
      nyTeam {
        id
        headShot {
          description
          gatsbyImageData
        }
        name
        slug
        title
      }
      parisTeam {
        id
        headShot {
          description
          gatsbyImageData
        }
        name
        slug
        title
      }
      seoulTeam {
        id
        headShot {
          description
          gatsbyImageData
        }
        name
        slug
        title
      }
      londonTeam {
        id
        headShot {
          description
          gatsbyImageData
        }
        name
        slug
        title
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
    allContentfulCareerPosting(sort: { postingDate: DESC }) {
      nodes {
        id
        jobTitle
        slug
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title="Team" image={data.contentfulTeamPage.teamPhoto.file.url} />
)

export default Team
