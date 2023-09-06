import { Link } from "gatsby"
import React, { useState } from "react"
import useWindowSize from "../utils/useWindowSize"
import { Fade } from "react-awesome-reveal"
import { PiCaretUpLight } from "react-icons/pi"

const ProjectList = ({
  projects,
  handleTypeFilter,
  setCity,
  setCountry,
  setYear,
  setRegion,
  setProjects,
}) => {
  const { width } = useWindowSize()
  const isMobile = width < 601
  const [projectToggle, setProjectToggle] = useState(false)
  const [typeToggle, setTypeToggle] = useState(false)
  const [locationToggle, setLocationToggle] = useState(false)
  const [yearToggle, setYearToggle] = useState(true)
  const [activeSort, setActiveSort] = useState("year")

  const orderByProject = () => {
    let orderedProjects
    if (projectToggle === false) {
      orderedProjects = projects.sort((a, b) =>
        a.projectName > b.projectName
          ? 1
          : b.projectName > a.projectName
          ? -1
          : 0
      )
    } else {
      orderedProjects = projects.sort((a, b) =>
        b.projectName > a.projectName
          ? 1
          : a.projectName > b.projectName
          ? -1
          : 0
      )
    }
    setProjects(orderedProjects)
    setProjectToggle(!projectToggle)
    setActiveSort("project")
    setTypeToggle(false)
    setYearToggle(false)
    setLocationToggle(false)
  }

  const orderByType = () => {
    let orderedProjects
    if (typeToggle === false) {
      orderedProjects = projects.sort((a, b) =>
        a.typology[0] > b.typology[0]
          ? 1
          : b.typology[0] > a.typology[0]
          ? -1
          : 0
      )
    } else {
      orderedProjects = projects.sort((a, b) =>
        b.typology[0] > a.typology[0]
          ? 1
          : a.typology[0] > b.typology[0]
          ? -1
          : 0
      )
    }
    setProjects(orderedProjects)
    setTypeToggle(!typeToggle)
    setActiveSort("type")
    setProjectToggle(false)
    setYearToggle(false)
    setLocationToggle(false)
  }

  const orderByYear = () => {
    let orderedProjects
    if (yearToggle === true) {
      orderedProjects = projects.sort((a, b) => a.year - b.year)
    } else {
      orderedProjects = projects.sort((a, b) => b.year - a.year)
    }
    setProjects(orderedProjects)
    setYearToggle(!yearToggle)
    setActiveSort("year")
    setTypeToggle(false)
    setProjectToggle(false)
    setLocationToggle(false)
  }

  const orderByLocation = () => {
    let orderedProjects
    if (locationToggle === false) {
      const cityProjects = projects
        .filter(project => project.city !== null)
        .sort((a, b) => (a.city > b.city ? 1 : b.city > a.city ? -1 : 0))
      const countryProjects = projects
        .filter(project => project.city === null && project.country !== null)
        .sort((a, b) =>
          a.country > b.country ? 1 : b.country > a.country ? -1 : 0
        )
      const worldwideProjects = projects.filter(
        project => project.city === null && project.country === null
      )
      orderedProjects = cityProjects
        .concat(countryProjects)
        .concat(worldwideProjects)
    } else {
      const cityProjects = projects
        .filter(project => project.city !== null)
        .sort((a, b) => (b.city > a.city ? 1 : a.city > b.city ? -1 : 0))
      const countryProjects = projects
        .filter(project => project.city === null && project.country !== null)
        .sort((a, b) =>
          b.country > a.country ? 1 : a.country > b.country ? -1 : 0
        )
      const worldwideProjects = projects.filter(
        project => project.city === null && project.country === null
      )
      orderedProjects = worldwideProjects
        .concat(countryProjects)
        .concat(cityProjects)
    }
    setProjects(orderedProjects)
    setLocationToggle(!locationToggle)
    setActiveSort("location")
    setTypeToggle(false)
    setYearToggle(false)
    setProjectToggle(false)
  }

  return (
    <div className="project-list-container">
      {!isMobile && (
        <>
          <div className="project-list-header">
            <button onClick={orderByProject} className="list-button">
              Project{" "}
              {activeSort === "project" && (
                <PiCaretUpLight
                  className={projectToggle ? "" : "toggle-down"}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderByType} className="list-button">
              Typology{" "}
              {activeSort === "type" && (
                <PiCaretUpLight
                  className={typeToggle ? "" : "toggle-down"}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderByLocation} className="list-button">
              Location{" "}
              {activeSort === "location" && (
                <PiCaretUpLight
                  className={locationToggle ? "" : "toggle-down"}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderByYear} className="list-button">
              Year{" "}
              {activeSort === "year" && (
                <PiCaretUpLight
                  className={yearToggle ? "toggle-down" : ""}
                ></PiCaretUpLight>
              )}
            </button>
          </div>
          <div className="list-items-container">
            {projects.map(project => {
              const hasLocation = project.city || project.country
              return (
                <div key={project.id} className="project-list-row">
                  <Fade triggerOnce={true}>
                    <Link
                      to={`projects/${project.slug}`}
                      className="list-button"
                    >
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
                  </Fade>
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
                <Fade triggerOnce={true}>
                  <div className="project-list-row-mobile-top">
                    <Link
                      to={`projects/${project.slug}`}
                      className="mobile-project-list-title"
                    >
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
                </Fade>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProjectList
