import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { RiLayoutGridFill } from "react-icons/ri"
import { PiListBold } from "react-icons/pi"
import { BsCircleFill, BsFilterLeft, BsArrowRight } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import { AiOutlineLine } from "react-icons/ai"
import ProjectGrid from "../components/projectGrid"
import ProjectList from "../components/projectList"
import ProjectMap from "../components/projectMap"

const Projects = ({ data, location }) => {
  const allProjects = data.allContentfulProject.nodes
  const thisYear = new Date().getFullYear()
  const [filterOpen, setFilterOpen] = useState(false)
  const [projects, setProjects] = useState(allProjects)
  const [view, setView] = useState("grid")
  const [recent, setRecent] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)
  const [progressFilter, setProgressFilter] = useState(
    location.state?.progressFilter || false
  )
  const [typologyFilter, setTypologyFilter] = useState(
    location.state?.typologyFilter || []
  )
  const [regionFilter, setRegionFilter] = useState(
    location.state?.regionFilter || []
  )
  const [city, setCity] = useState(location.state?.city || "")
  const [year, setYear] = useState(location.state?.year || null)
  const [architect, setArchitect] = useState(location.state?.architect || "")
  const [interiorDesigner, setInteriorDesigner] = useState(
    location.state?.interiorDesigner || ""
  )
  const [country, setCountry] = useState(location.state?.country || "")
  const [network, setNetwork] = useState(location.state?.network || "")
  const [client, setClient] = useState(location.state?.client || "")

  const isDisabled =
    !recent &&
    !featuredFilter &&
    !progressFilter &&
    !typologyFilter.length &&
    !regionFilter.length &&
    !city &&
    !year &&
    !architect &&
    !interiorDesigner &&
    !country &&
    !network &&
    !client

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const filterSelectedStatus = array => {
    if (progressFilter) {
      return [
        ...array,
        allProjects.filter(item => item.status.includes("In Progress")),
      ]
    } else return array
  }

  const filterRecentlyCompleted = array => {
    if (recent) {
      return [
        ...array,
        allProjects.filter(
          item => item.status.includes("Completed") && thisYear - item.year <= 2
        ),
      ]
    } else return array
  }

  const filterByFeatured = array => {
    if (featuredFilter) {
      return [...array, array.filter(item => item.featured)]
    } else return array
  }

  const filterByCity = array => {
    return array.filter(item => item.city === city)
  }

  const filterByYear = array => {
    return array.filter(item => item.year === year)
  }

  const filterByArchitect = array => {
    return array.filter(item => item.architect === architect)
  }

  const filterByInteriorDesigner = array => {
    return array.filter(item => item.interiorDesigner === interiorDesigner)
  }

  const filterByCountry = array => {
    return array.filter(item => item.country === country)
  }

  const filterByNetwork = array => {
    return array.filter(item => item.furtherNetworkLinks?.includes(network))
  }

  const filterByClient = array => {
    return array.filter(item => item.client?.includes(client))
  }

  const filterByType = array => {
    return [
      ...array,
      typologyFilter
        .map(term => array.filter(item => item.typology.includes(term)))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const filterByRegion = array => {
    return [
      ...array,
      regionFilter
        .map(term => array.filter(item => item.geographicRegion === term))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const handleTypeFilter = type => {
    if (typologyFilter.includes(type)) {
      setTypologyFilter(typologyFilter.filter(item => item !== type))
    } else {
      setTypologyFilter([...typologyFilter, type])
    }
  }

  const handleLocaleFilter = locale => {
    if (regionFilter.includes(locale)) {
      setRegionFilter(regionFilter.filter(item => item !== locale))
    } else {
      setRegionFilter([...regionFilter, locale])
    }
  }

  const handleFilter = () => {
    let result = allProjects
    if (featuredFilter || recent || progressFilter) {
      result = filterSelectedStatus(result)
      result = filterRecentlyCompleted(result)
      result = filterByFeatured(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (typologyFilter.length) {
      result = filterByType(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (regionFilter.length) {
      result = filterByRegion(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (city) {
      result = filterByCity(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (year) {
      result = filterByYear(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (architect) {
      result = filterByArchitect(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (interiorDesigner) {
      result = filterByInteriorDesigner(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (country) {
      result = filterByCountry(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (network) {
      result = filterByNetwork(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    if (client) {
      result = filterByClient(result)
      result = result.reduce((a, b) => a.concat(b), []).filter(onlyUnique)
    }
    setProjects(result)
  }

  const handleClearAll = () => {
    setFeaturedFilter(false)
    setProgressFilter(false)
    setRecent(false)
    setTypologyFilter([])
    setRegionFilter([])
    setCity("")
    setYear(null)
    setArchitect("")
    setInteriorDesigner("")
    setCountry("")
    setNetwork("")
    setClient("")
    setProjects(allProjects)
  }

  const typologies = allProjects
    .map(project => project.typology)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .sort()

  const locations = allProjects
    .map(project => project.geographicRegion)
    .filter(onlyUnique)
    .sort()

  useEffect(() => {
    if (isDisabled) {
      setProjects(allProjects)
    } else if (filterOpen) {
      return
    } else {
      handleFilter()
    }
  }, [
    city,
    typologyFilter,
    regionFilter,
    year,
    progressFilter,
    recent,
    featuredFilter,
    year,
    architect,
    interiorDesigner,
    country,
    network,
    client,
  ])

  return (
    <Layout>
      <div className="project-header">
        <Link to="/projects">Projects</Link>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="project-options-bar">
        {filterOpen ? (
          <button
            className="project-options-button-top"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <GrFormClose className="filter-icon"></GrFormClose>
            Filter
          </button>
        ) : (
          <button
            className="project-options-button-top"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <BsFilterLeft className="filter-icon"></BsFilterLeft>
            Filter
          </button>
        )}
        <div className={`filter-menu ${filterOpen ? "" : "hide-filter"}`}>
          <div className="filter-column">
            <button
              className="project-options-button"
              onClick={() => setFeaturedFilter(!featuredFilter)}
            >
              <div
                className={`check-box ${featuredFilter ? "checked" : ""}`}
              ></div>{" "}
              Featured Projects
            </button>
            <button
              className="project-options-button"
              onClick={() => setRecent(!recent)}
            >
              <div className={`check-box ${recent ? "checked" : ""}`}></div>{" "}
              Recently Completed
            </button>
            <button
              className="project-options-button"
              onClick={() => setProgressFilter(!progressFilter)}
            >
              <div
                className={`check-box ${progressFilter ? "checked" : ""}`}
              ></div>{" "}
              In Progress
            </button>
          </div>
          <div className="filter-column">
            <p className="upper">Typology</p>
            {typologies.map((type, index) => (
              <button
                key={index}
                className="project-options-button"
                onClick={() => handleTypeFilter(type)}
              >
                <div
                  className={`check-box ${
                    typologyFilter.includes(type) ? "checked" : ""
                  }`}
                ></div>{" "}
                {type}
              </button>
            ))}
          </div>
          <div className="filter-column">
            <p className="upper">Location</p>
            {locations.map((locale, index) => (
              <button
                key={index}
                className="project-options-button"
                onClick={() => handleLocaleFilter(locale)}
              >
                <div
                  className={`check-box ${
                    regionFilter.includes(locale) ? "checked" : ""
                  }`}
                ></div>{" "}
                {locale}
              </button>
            ))}
          </div>
          <div className="filter-column network-filter-column">
            <div>
              <p className="upper">Network</p>
              <Link to="/network" className="network-see-all">
                See All <BsArrowRight></BsArrowRight>
              </Link>
            </div>
            <div className="filter-actions-container">
              <button
                disabled={isDisabled}
                className="filter-apply"
                onClick={() => {
                  handleFilter()
                  setFilterOpen(false)
                }}
              >
                Apply
              </button>
              <button
                className="clear-all-button"
                onClick={() => handleClearAll()}
                disabled={isDisabled}
              >
                <AiOutlineLine></AiOutlineLine> Clear all
              </button>
            </div>
          </div>
        </div>
        <div className="project-view-options">
          <button
            className={`project-options-button-top ${
              view === "grid" ? "" : "faded"
            }`}
            onClick={() => setView("grid")}
          >
            <RiLayoutGridFill></RiLayoutGridFill>
            Grid
          </button>
          <button
            className={`project-options-button-top ${
              view === "list" ? "" : "faded"
            }`}
            onClick={() => setView("list")}
          >
            <PiListBold></PiListBold>
            List
          </button>
          <button
            className={`project-options-button-top ${
              view === "map" ? "" : "faded"
            }`}
            onClick={() => setView("map")}
          >
            <BsCircleFill></BsCircleFill>
            Map
          </button>
        </div>
      </div>
      {!isDisabled && (
        <div className="current-filter-container">
          {featuredFilter && (
            <button
              className="current-filter-button"
              onClick={() => setFeaturedFilter(false)}
            >
              <GrFormClose></GrFormClose>Featured Projects
            </button>
          )}
          {recent && (
            <button
              className="current-filter-button"
              onClick={() => setRecent(false)}
            >
              <GrFormClose></GrFormClose>Recently Completed
            </button>
          )}
          {progressFilter && (
            <button
              className="current-filter-button"
              onClick={() => setProgressFilter(false)}
            >
              <GrFormClose></GrFormClose>In Progress
            </button>
          )}
          {typologyFilter.length > 0 && (
            <>
              {typologyFilter.map((item, index) => (
                <button
                  key={index}
                  className="current-filter-button"
                  onClick={() => handleTypeFilter(item)}
                >
                  <GrFormClose></GrFormClose>
                  {item}
                </button>
              ))}
            </>
          )}
          {regionFilter.length > 0 && (
            <>
              {regionFilter.map((item, index) => (
                <button
                  key={index}
                  className="current-filter-button"
                  onClick={() => handleLocaleFilter(item)}
                >
                  <GrFormClose></GrFormClose>
                  {item}
                </button>
              ))}
            </>
          )}
          {city && (
            <button
              className="current-filter-button"
              onClick={() => setCity("")}
            >
              <GrFormClose></GrFormClose>
              {city}
            </button>
          )}
          {year && (
            <button
              className="current-filter-button"
              onClick={() => setYear("")}
            >
              <GrFormClose></GrFormClose>
              Year: {year}
            </button>
          )}
          {architect && (
            <button
              className="current-filter-button"
              onClick={() => setArchitect("")}
            >
              <GrFormClose></GrFormClose>
              {architect}
            </button>
          )}
          {interiorDesigner && (
            <button
              className="current-filter-button"
              onClick={() => setInteriorDesigner("")}
            >
              <GrFormClose></GrFormClose>
              {interiorDesigner}
            </button>
          )}
          {country && (
            <button
              className="current-filter-button"
              onClick={() => setCountry("")}
            >
              <GrFormClose></GrFormClose>
              {country}
            </button>
          )}
          {network && (
            <button
              className="current-filter-button"
              onClick={() => setNetwork("")}
            >
              <GrFormClose></GrFormClose>
              {network.split(": ")[1]}
            </button>
          )}
          {client && (
            <button
              className="current-filter-button"
              onClick={() => setClient("")}
            >
              <GrFormClose></GrFormClose>
              {client}
            </button>
          )}
          <button
            className="current-filter-button"
            onClick={() => handleClearAll()}
          >
            <AiOutlineLine></AiOutlineLine>Clear all
          </button>
        </div>
      )}
      {view === "grid" && (
        <>
          <div style={{ height: "140px" }}></div>
          <ProjectGrid
            projects={projects}
            handleTypeFilter={handleTypeFilter}
            setCity={setCity}
            setCountry={setCountry}
            handleFilter={handleFilter}
            setRegion={handleLocaleFilter}
            projectPage={true}
          ></ProjectGrid>
        </>
      )}
      {view === "list" && (
        <>
          <div style={{ height: "140px" }}></div>
          <ProjectList
            projects={projects}
            handleTypeFilter={handleTypeFilter}
            setCity={setCity}
            setCountry={setCountry}
            handleFilter={handleFilter}
            setYear={setYear}
          ></ProjectList>
        </>
      )}
      {view === "map" && (
        <>
          <ProjectMap
            projects={projects}
            handleTypeFilter={handleTypeFilter}
            setCity={setCity}
            setCountry={setCountry}
            handleFilter={handleFilter}
            setRegion={handleLocaleFilter}
            setYear={setYear}
            setProjects={setProjects}
          ></ProjectMap>
        </>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject(sort: { year: DESC }) {
      nodes {
        architect
        interiorDesigner
        client
        furtherNetworkLinks
        geographicRegion
        city
        country
        id
        projectName
        slug
        typology
        year
        featured
        status
        heroImage {
          description
          gatsbyImageData(width: 400)
        }
        exactLocation {
          lat
          lon
        }
      }
    }
  }
`

export default Projects
