import React, { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps"
import { Tooltip } from "react-tooltip"
import { Link } from "gatsby"
import ProjectTile from "./projectTile"

const ProjectMap = ({
  projects,
  projectPage,
  setCity,
  setCountry,
  handleTypeFilter,
  setRegion,
}) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 })
  const [scaleFactor, setScaleFactor] = useState(1)
  const cleanedData = projects.filter(project => project.exactLocation !== null)


  function handleZoomIn() {
    if (position.zoom >= 100) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.2 }))
    setScaleFactor(scale => scale * 1.2)
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.2 }))
    setScaleFactor(scale => scale / 1.2)
  }

  function handleMoveEnd(position) {
    setPosition(position)
  }

  return (
    <div className="projects-map-container">
      <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMove={({ zoom }) => {
            setScaleFactor(zoom)
          }}
          onMoveEnd={handleMoveEnd}
          maxZoom={100}
        >
          <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  tabIndex={-1}
                />
              ))
            }
          </Geographies>
          {cleanedData.map(project => (
            <Marker
              key={project.id}
              coordinates={[
                project.exactLocation.lon,
                project.exactLocation.lat,
              ]}
              data-tooltip-id={project.id}
            >
              <Link to={`/project/${project.slug}`}>
                <circle r={2 / scaleFactor} className="map-marker" />
              </Link>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="zoom-button-container">
        <button className="zoom-button" onClick={handleZoomIn}>
          +
        </button>
        <button className="zoom-button" onClick={handleZoomOut}>
          -
        </button>
      </div>
      {cleanedData.map(project => (
        <Tooltip
          id={project.id}
          key={project.id}
          place="bottom"
          clickable
          className="map-tooltip"
        >
          <ProjectTile
            project={project}
            setCity={setCity}
            setCountry={setCountry}
            handleTypeFilter={handleTypeFilter}
            setRegion={setRegion}
            projectPage={projectPage}
          ></ProjectTile>
        </Tooltip>
      ))}
    </div>
  )
}

export default ProjectMap
