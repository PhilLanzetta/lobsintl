import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        className="hero-svg"
      >
        <path
          id="Path_118"
          data-name="Path 118"
          d="M0,8,5.436,0,11,8"
          transform="translate(19.688 9.5) rotate(90)"
          fill="none"
        />
        <g id="Ellipse_184" data-name="Ellipse 184" fill="none">
          <circle cx="15" cy="15" r="14.5" />
        </g>
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        className="hero-svg"
      >
        <path
          id="Path_118"
          data-name="Path 118"
          d="M0,0,5.436,8,11,0"
          transform="translate(18.313 9.5) rotate(90)"
          fill="none"
        />
        <g id="Ellipse_184" data-name="Ellipse 184" fill="none">
          <circle cx="15" cy="15" r="14.5" />
        </g>
      </svg>
    </div>
  )
}

const HomeSlider = ({ images }) => {
  const [initialHeight, setInitialHeight] = useState(800)
  const { height, width } = useWindowSize()
  const mobile = width < 601

  useEffect(() => {
    setInitialHeight(height)
  }, [])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow addClassName="next-button" />,
    prevArrow: <PrevArrow addClassName="prev-button" />,
    useTransform: false,
  }

  return (
    <div
      className="home-slider-container"
      style={{ height: `${mobile ? initialHeight + "px" : height + "px"}` }}
    >
      <Slider
        {...settings}
        className="home-slider"
        style={{ height: `${mobile ? initialHeight + "px" : height + "px"}` }}
      >
        {images?.map((image, index) => (
          <div className="home-slide-container" key={index}>
            <GatsbyImage
              image={image?.heroImage?.gatsbyImageData}
              alt={image?.heroImage?.description}
              className="home-slide-image"
              style={{
                height: `${mobile ? initialHeight + "px" : height + "px"}`,
              }}
            ></GatsbyImage>
            <div className="home-slider-text">
              <Link to={`/projects/${image.slug}`} className="home-title-link">
                <p className="upper">{image.projectName}</p>
                <p>{image.shortExcerpt}</p>
              </Link>
              <div className="tile-tag-container">
                {image.typology.map((type, index) => (
                  <Link
                    className="tile-tag-btn"
                    key={index}
                    to="/projects"
                    state={{ typologyFilter: [type] }}
                  >
                    {type}
                  </Link>
                ))}
                <div className="tile-tag-btn">
                  <Link
                    to="/projects"
                    state={{ city: image.city, country: image.country }}
                  >
                    {image.city}, {image.country}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeSlider
