import { Link } from "gatsby"
import React from "react"
import useWindowSize from "../utils/useWindowSize"

const ProjectList = ({
  projects,
  handleTypeFilter,
  setCity,
  setCountry,
  setYear,
  setRegion,
}) => {
  const { width } = useWindowSize()
  const isMobile = width < 601
  return (
    <div className="project-list-container">
      {!isMobile && (
        <>
          <div className="project-list-header">
            <p className="list-button">Project</p>
            <p className="list-button">Typology</p>
            <p className="list-button">Location</p>
            <p className="list-button">Year</p>
          </div>
          <div className="list-items-container">
            {projects.map(project => {
              const hasLocation = project.city || project.country
              return (
                <div key={project.id} className="project-list-row">
                  <Link to={`projects/${project.slug}`} className="list-button">
                    {project.projectName}
                  </Link>
                  <div className="list-typology">
                    {project.typology.map((type, index) => (
                      <button
                        onClick={() => handleTypeFilter(type)}
                        key={index}
                        className="list-button"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {hasLocation ? (
                    <button
                      className="list-button"
                      onClick={() => {
                        setCity(project.city)
                        setCountry(project.country)
                      }}
                    >
                      <p>
                        {project.city && <span>{project.city},</span>}{" "}
                        {project.country}
                      </p>
                    </button>
                  ) : (
                    <button
                      className="list-button"
                      onClick={() => setRegion(project.geographicRegion)}
                    >
                      {project.geographicRegion}
                    </button>
                  )}
                  <button
                    className="list-button"
                    onClick={() => setYear(project.year)}
                  >
                    {project.year}
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}
      {isMobile && (
        <div className="mobile-list-container">
          {projects.map(project => {
            const hasLocation = project.city || project.country
            return (
              <div key={project.id} className="project-list-row-mobile">
                <div className="project-list-row-mobile-top">
                  <Link to={`projects/${project.slug}`} className="mobile-project-list-title">
                    {project.projectName}
                  </Link>
                  <button
                  className="mobile-list-year"
                    onClick={() => setYear(project.year)}
                  >
                    {project.year}
                  </button>
                </div>
                <div className="tile-tag-container">
                    {project.typology.map((type, index) => (
                      <button
                        onClick={() => handleTypeFilter(type)}
                        key={index}
                        className="tile-tag-btn"
                      >
                        {type}
                      </button>
                    ))}
                  {hasLocation ? (
                    <button
                      className="tile-tag-btn"
                      onClick={() => {
                        setCity(project.city)
                        setCountry(project.country)
                      }}
                    >
                      <p>
                        {project.city && <span>{project.city},</span>}{" "}
                        {project.country}
                      </p>
                    </button>
                  ) : (
                    <button
                      className="list-button"
                      onClick={() => setRegion(project.geographicRegion)}
                    >
                      {project.geographicRegion}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProjectList
