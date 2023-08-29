import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HeroSlider from "../components/heroSlider"
import ProjectIntro from "../components/projectIntro"
import ProjectTable from "../components/projectTable"
import ModuleContent from "../components/moduleContent"
import Related from "../components/related"

const SingleProject = ({ data }) => {
  const {
    projectName,
    architect,
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
    interiorDesigner,
    dateCompleted,
    city,
    country,
    bodyText,
    team,
    client,
    furtherNetworkLinks,
    photoCredit,
    press,
    principal,
    projectLeader,
  } = data.contentfulProject

  return (
    <Layout>
      <div className="page-header">
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
      </div>
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
        architect={architect}
        interiorDesigner={interiorDesigner}
        awards={awards}
        status={status}
        size={size}
        dateCompleted={dateCompleted}
        team={team}
        principal={principal}
        projectLeader={projectLeader}
        client={client}
        network={furtherNetworkLinks}
        photoCredit={photoCredit}
        press={press}
      ></ProjectTable>
      {moduleContent && (
        <ModuleContent moduleContent={moduleContent}></ModuleContent>
      )}
      <Related></Related>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      architect
      interiorDesigner
      year
      typology
      status
      size
      projectName
      awards {
        id
        awardName
        year
        link
      }
      moduleContent {
        ... on ContentfulSingleColumnImage {
          singleId: id
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
      furtherNetworkLinks
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
