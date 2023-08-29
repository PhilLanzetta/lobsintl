import React from "react"
import ProjectTile from "./projectTile"

const ProjectGrid = ({
  projects,
  projectPage,
  setCity,
  setCountry,
  handleTypeFilter,
  setRegion,
}) => {
  return (
    <div className="projects-grid-container">
      {projects ? (
        projects.map(project => (
          <ProjectTile
            key={project.id}
            project={project}
            setCity={setCity}
            setCountry={setCountry}
            handleTypeFilter={handleTypeFilter}
            setRegion={setRegion}
            projectPage={projectPage}
          ></ProjectTile>
        ))
      ) : (
        <div>
          <p>Sorry, no projects match</p>
        </div>
      )}
    </div>
  )
}

export default ProjectGrid
