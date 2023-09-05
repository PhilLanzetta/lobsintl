import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HeroSlider from "../components/heroSlider"
import ProjectIntro from "../components/projectIntro"
import ProjectTable from "../components/projectTable"
import ModuleContent from "../components/moduleContent"
import Related from "../components/related"
import HideOnScroll from "../components/hideOnScroll"

const SingleProject = ({ data }) => {
  const {
    projectName,
    designTeam,
    awards,
    year,
    typology,
    status,
    size,
    state,
    moduleContent,
    images,
    headlineText,
    geographicRegion,
    dateCompleted,
    city,
    country,
    bodyText,
    team,
    client,
    photoCredit,
    press,
    principal,
    projectLeader,
  } = data.contentfulProject

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/projects">Projects</Link> |{" "}
        <div className="project-header-type">
          {typology?.map((type, index) => (
            <Link to="/projects" key={index} state={{ typologyFilter: [type] }}>
              {type}
            </Link>
          ))}
        </div>{" "}
        |{" "}
        <Link to="/projects" state={{ regionFilter: [geographicRegion] }}>
          {geographicRegion}
        </Link>
      </HideOnScroll>
      <HeroSlider images={images}></HeroSlider>
      <ProjectIntro
        headline={headlineText?.headlineText}
        title={projectName}
        body={bodyText?.bodyText}
        city={city}
        state={state}
        country={country}
        year={year}
        region={geographicRegion}
      ></ProjectIntro>
      <ProjectTable
        designTeam={designTeam}
        awards={awards}
        status={status}
        size={size}
        dateCompleted={dateCompleted}
        team={team}
        principal={principal}
        projectLeader={projectLeader}
        client={client}
        photoCredit={photoCredit}
        press={press}
      ></ProjectTable>
      {moduleContent && (
        <div className="project-module-container">
          <ModuleContent moduleContent={moduleContent}></ModuleContent>
        </div>
      )}
      <Related></Related>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      year
      typology
      status
      size
      projectName
      designTeam {
        id
        name
        role
      }
      awards {
        id
        awardName
        year
        link
      }
      moduleContent {
        ... on ContentfulSingleColumnImage {
          singleId: id
          margin
          image {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulTwoColumnImage {
          twoColId: id
          margin
          images {
            caption
            image {
              description
              gatsbyImageData
            }
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          caption
          margin
          vimeoLink
          coverImage {
            description
            gatsbyImageData
          }
        }
      }
      images {
        description
        gatsbyImageData
        id
      }
      headlineText {
        headlineText
      }
      geographicRegion
      dateCompleted
      client
      city
      state
      country
      bodyText {
        bodyText
      }
      team {
        name
        slug
        primaryOffice
        id
      }
      press {
        id
        link
        publication
        publicationDate
      }
      photoCredit
      principal {
        name
        slug
        primaryOffice
        id
      }
      projectLeader {
        name
        slug
        primaryOffice
        id
      }
    }
  }
`

export default SingleProject
