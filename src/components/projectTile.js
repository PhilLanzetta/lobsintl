import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { Fade } from "react-awesome-reveal"

const ProjectTile = ({
  projectPage,
  project,
  setCity,
  handleTypeFilter,
  setCountry,
  setRegion,
}) => {
  const hasLocation = project.city || project.country
  return (
    <div key={project.id} className="project-tile">
      <Fade triggerOnce={true}>
        <Link to={`/project/${project.slug}`}>
          <GatsbyImage
            image={project.heroImage?.gatsbyImageData}
            alt={project.heroImage?.description}
            className="project-tile-image"
          ></GatsbyImage>
          <div className="tile-title-container">
            <p className="tile-title">{project.projectName}</p>
            <p>{project.year}</p>
          </div>
        </Link>
        <div className="tile-tag-container">
          {project.typology?.map((type, index) =>
            projectPage ? (
              <button
                className="tile-tag-btn"
                key={index}
                onClick={() => handleTypeFilter(type)}
              >
                {type}
              </button>
            ) : (
              <Link
                to="/projects"
                className="tile-tag-btn"
                key={index}
                state={{ typeFilter: type }}
              >
                {type}
              </Link>
            )
          )}
          {hasLocation ? (
            projectPage ? (
              <button
                className="tile-tag-btn"
                onClick={() => {
                  setCity(project.city)
                  setCountry(project.country)
                }}
              >
                {project.city && <span>{project.city}, </span>}
                {project.country}
              </button>
            ) : (
              <Link
                className="tile-tag-btn"
                to="/projects"
                state={{ city: project.city, country: project.country }}
              >
                {project.city && <span>{project.city}, </span>}
                {project.country}
              </Link>
            )
          ) : projectPage ? (
            <button
              className="tile-tag-btn"
              onClick={() => setRegion(project.geographicRegion)}
            >
              {project.geographicRegion}
            </button>
          ) : (
            <Link
              className="tile-tag-btn"
              to="/projects"
              state={{ regionFilter: [project.geographicRegion] }}
            >
              {project.geographicRegion}
            </Link>
          )}
        </div>
      </Fade>
    </div>
  )
}

export default ProjectTile
