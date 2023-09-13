import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { RelatedProjectsFactory } from "./relatedProjectsFactory"
import ProjectGrid from "./projectGrid"

const Related = ({ currentProjectSlug, tags, category }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulProject(sort: { year: DESC }) {
        nodes {
          city
          slug
          country
          geographicRegion
          heroImage {
            gatsbyImageData(width: 600)
            description
          }
          projectName
          typology
          metadata {
            tags {
              name
            }
          }
        }
      }
    }
  `)

  const projects = data.allContentfulProject.nodes

  const relatedProjectsArray = new RelatedProjectsFactory(
    projects,
    currentProjectSlug
  )
    .setMaxProjects(6)
    .setCategory(category)
    .setTags(tags)
    .getProjects()

  const relatedProjects = relatedProjectsArray.map(item => item.project)

  return (
    <div>
      <p className="related-container upper">Related Projects</p>
      <ProjectGrid projects={relatedProjects}></ProjectGrid>
    </div>
  )
}

export default Related
