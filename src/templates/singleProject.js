import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HeroSlider from "../components/heroSlider"
import ProjectIntro from "../components/projectIntro"
import ProjectTable from "../components/projectTable"
import ModuleContent from "../components/moduleContent"
import Related from "../components/related"
import HideOnScroll from "../components/hideOnScroll"
import Seo from "../components/seo"

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
    projectLeader,
    slug,
    metadata,
    hervIsPrincipal,
  } = data.contentfulProject

  const relatedCategory = typology?.length > 0 ? typology : ["no category"]
  const relatedTags =
    metadata?.tags?.length > 0
      ? metadata.tags.map(tag => tag.name)
      : ["no tags"]

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
        principal={hervIsPrincipal}
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
      <Related
        currentProjectSlug={slug}
        category={relatedCategory}
        tags={relatedTags}
      ></Related>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      slug
      year
      typology
      hervIsPrincipal
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
        file {
          url
        }
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
      projectLeader {
        name
        slug
        primaryOffice
        id
      }
      metadata {
        tags {
          name
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo
    title={data.contentfulProject.projectName}
    image={data.contentfulProject.images[0]?.file.url}
  />
)

export default SingleProject
