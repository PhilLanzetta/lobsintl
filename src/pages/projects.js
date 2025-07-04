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
import useWindowSize from "../utils/useWindowSize"
import HideOnScroll from "../components/hideOnScroll"
import Seo from "../components/seo"

const Projects = ({ data, location }) => {
  const allProjects = data.allContentfulProject.nodes
  const [filterOpen, setFilterOpen] = useState(false)
  const [projects, setProjects] = useState(allProjects)
  const [view, setView] = useState()
  const [paddingTop, setPaddingTop] = useState(145)
  const [featuredFilter, setFeaturedFilter] = useState(true)
  const [statusFilter, setStatusFilter] = useState(
    location.state?.statusFilter ?  location.state?.statusFilter : location.search ? [] : ["Completed"]
  )
  const [typologyFilter, setTypologyFilter] = useState(
    location.state?.typologyFilter || []
  )
  const [regionFilter, setRegionFilter] = useState(
    location.state?.regionFilter || []
  )
  const [city, setCity] = useState(location.state?.city || "")
  const [year, setYear] = useState(location.state?.year || null)
  const [country, setCountry] = useState(location.state?.country || "")
  const [network, setNetwork] = useState(location.state?.network || "")
  const [client, setClient] = useState(location.state?.client || "")
  const { width } = useWindowSize()

  const isMobile = width < 941
  const projectOptionsRef = useRef()
  const url = new URL("https://lobsintl.com/projects/")
  const searchParams = new URLSearchParams(location.search)
  
  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key === "featured") {
        setFeaturedFilter(value)
      } else if (key === "network") {
        setNetwork(value)
      } else if (key === "year") {
        setYear(parseInt(value, 10))
      } else if (key === "city") {
        setCity(value)
      } else if (key === "country") {
        setCountry(value)
      } else if (key === "client") {
        setClient(value)
      } else if (key === "status") {
        setStatusFilter(prev => [...prev, value])
      } else if (key === "location") {
        setRegionFilter(prev => [...prev, value])
      } else if (key === "typology") {
        setTypologyFilter(prev => [...prev, value])
      }
    }
  }, [])

  useEffect(() => {
    const { bottom } = projectOptionsRef.current.getBoundingClientRect()
    setPaddingTop(bottom)
  }, [projectOptionsRef])

  const isDisabled =
    !featuredFilter &&
    !statusFilter.length &&
    !typologyFilter.length &&
    !regionFilter.length &&
    !city &&
    !year &&
    !country &&
    !network &&
    !client

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const filterSelectedStatus = array => {
    return [ 
      statusFilter
        .map(term => array.filter(item => item.status === term))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const filterByFeatured = array => {
    if (featuredFilter) {
      return [array.filter(item => item.featured)]
    } else {
      return array
    }
  }

  const filterByCity = array => {
    return array.filter(item => item.city === city)
  }

  const filterByYear = array => {
    return array.filter(item => item.year === year)
  }

  const filterByCountry = array => {
    return array.filter(item => item.country === country)
  }

  const filterByNetwork = array => {
    return array.filter(item =>
      item.designTeam?.some(member => member.name === network)
    )
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

  const handleStatusFilter = status => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(item => item !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  const handleLocaleFilter = locale => {
    if (regionFilter.includes(locale)) {
      setRegionFilter(regionFilter.filter(item => item !== locale))
    } else {
      setRegionFilter([...regionFilter, locale])
    }
  }

  const updateURL = () => {
    const params = new URLSearchParams({})
    const obj = {
      featured: featuredFilter ? featuredFilter : "",
      status: statusFilter,
      typology: typologyFilter,
      location: regionFilter,
      city: city,
      year: year,
      country: country,
      network: network,
      client: client,
    }
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        for (const value of obj[key]) {
          params.append(key, value)
        }
      } else {
        params.append(key, obj[key])
      }
    }
    let keysForDel = []
    params.forEach((value, key) => {
      if (value == "" || value == "null") {
        keysForDel.push(key)
      }
    })
    keysForDel.forEach(key => {
      params.delete(key)
    })
    const new_url = `${url}?${params}`
    window.history.pushState({}, "", new_url)
  }

  const handleFilter = () => {
    let result = allProjects
    if (featuredFilter) {
      result = filterByFeatured(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (statusFilter.length) {
      result = filterSelectedStatus(result)
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
    setStatusFilter([])
    setTypologyFilter([])
    setRegionFilter([])
    setCity("")
    setYear(null)
    setCountry("")
    setNetwork("")
    setClient("")
    setProjects(allProjects)
    const new_url = `${url}`
    window.history.pushState({}, "", new_url)
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
      updateURL()
    }
  }, [
    city,
    typologyFilter,
    regionFilter,
    year,
    statusFilter,
    featuredFilter,
    year,
    country,
    network,
    client,
  ])

  useEffect(() => {
    if (localStorage.getItem("view")) {
      setView(localStorage.getItem("view"))
    } else {
      setView("grid")
    }
  }, [])

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/projects">Projects</Link>
      </HideOnScroll>
      <div
        ref={projectOptionsRef}
        className={`project-options-bar ${filterOpen ? "" : "show-shadow"}`}
      >
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
        {!isDisabled && !isMobile && (
          <div className="current-filter-container">
            {featuredFilter && (
              <button
                className="current-filter-button"
                onClick={() => setFeaturedFilter(false)}
              >
                <GrFormClose></GrFormClose>Featured Projects
              </button>
            )}
            {statusFilter.length > 0 && (
              <>
                {statusFilter.map((item, index) => (
                  <button
                    key={index}
                    className="current-filter-button"
                    onClick={() => handleStatusFilter(item)}
                  >
                    <GrFormClose></GrFormClose>
                    {item}
                  </button>
                ))}
              </>
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
                {network}
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
        <div className="project-view-options">
          <button
            className={`project-options-button-top ${
              view === "grid" ? "" : "faded"
            }`}
            onClick={() => {
              localStorage.setItem("view", "grid")
              setView("grid")
            }}
          >
            <RiLayoutGridFill></RiLayoutGridFill>
            Grid
          </button>
          <button
            className={`project-options-button-top ${
              view === "list" ? "" : "faded"
            }`}
            onClick={() => {
              localStorage.setItem("view", "list")
              setView("list")
            }}
          >
            <PiListBold></PiListBold>
            List
          </button>
          <button
            className={`project-options-button-top ${
              view === "map" ? "" : "faded"
            }`}
            onClick={() => {
              localStorage.setItem("view", "map")
              setView("map")
            }}
          >
            <BsCircleFill></BsCircleFill>
            Map
          </button>
        </div>
        {!isDisabled && isMobile && (
          <div className="current-filter-container">
            {featuredFilter && (
              <button
                className="current-filter-button"
                onClick={() => setFeaturedFilter(false)}
              >
                <GrFormClose></GrFormClose>Featured Projects
              </button>
            )}
            {statusFilter.length > 0 && (
              <>
                {statusFilter.map((item, index) => (
                  <button
                    key={index}
                    className="current-filter-button"
                    onClick={() => handleStatusFilter(item)}
                  >
                    <GrFormClose></GrFormClose>
                    {item}
                  </button>
                ))}
              </>
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
                {network}
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
      </div>
      <div
        className={`filter-menu ${filterOpen ? "" : "hide-filter"}`}
        style={{ paddingTop: `${paddingTop}px` }}
      >
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
            onClick={() => handleStatusFilter("Completed")}
          >
            <div
              className={`check-box ${
                statusFilter.includes("Completed") ? "checked" : ""
              }`}
            ></div>{" "}
            Completed
          </button>
          <button
            className="project-options-button"
            onClick={() => handleStatusFilter("In Progress")}
          >
            <div
              className={`check-box ${
                statusFilter.includes("In Progress") ? "checked" : ""
              }`}
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
                updateURL()
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
      <div className="project-view-container">
        {view === "grid" && (
          <>
            <div style={{ height: `${paddingTop}px` }}></div>
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
            <div style={{ height: `${paddingTop}px` }}></div>
            <ProjectList
              projects={projects}
              handleTypeFilter={handleTypeFilter}
              setCity={setCity}
              setCountry={setCountry}
              handleFilter={handleFilter}
              setYear={setYear}
              setProjects={setProjects}
              paddingTop={paddingTop}
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
              projectPage={true}
            ></ProjectMap>
          </>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject(sort: { year: DESC }) {
      nodes {
        client
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
        designTeam {
          id
          name
          role
        }
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

export const Head = () => <Seo title="Projects" />

export default Projects
