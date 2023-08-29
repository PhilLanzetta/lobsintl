import React, { useRef } from "react"
import Slider from "react-slick"
import ProjectTile from "./projectTile"
import { Link } from "gatsby"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import useWindowSize from "../utils/useWindowSize"

const WorksInProgress = ({ projects }) => {
  const sliderRef = useRef()
  const { width } = useWindowSize()
  const isMobile = width < 601
  const settings = {
    slidesToShow: 2.15,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1.15,
        },
      },
    ],
  }
  return (
    <div className="wip-container">
      <div className="wip-heading">
        <div className="wip-heading-element">
          <Link
            to="/projects"
            state={{ progressFilter: true }}
            className="upper wip-title"
          >
            Works In progress
          </Link>
          {!isMobile && (
            <Link
              to="/projects"
              state={{ progressFilter: true }}
              className="home-link"
            >
              View All
            </Link>
          )}
        </div>
        {!isMobile && (
          <div className="wip-heading-element">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              aria-label="go to previous"
            >
              <BsArrowLeft></BsArrowLeft>
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              aria-label="go to next"
            >
              <BsArrowRight></BsArrowRight>
            </button>
          </div>
        )}
      </div>
      <Slider {...settings} ref={sliderRef}>
        {projects.map(project => (
          <ProjectTile key={project.id} project={project}></ProjectTile>
        ))}
      </Slider>
      {isMobile && (
        <Link
          to="/projects"
          state={{ progressFilter: true }}
          className="home-link"
          style={{ marginTop: "0px" }}
        >
          <BsArrowRight></BsArrowRight> View All
        </Link>
      )}
    </div>
  )
}

export default WorksInProgress
