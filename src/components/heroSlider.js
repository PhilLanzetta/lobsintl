import React from "react"
import { useState } from "react"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"

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

const HeroSlider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: (current, next) => {
      setImageIndex(next)
    },
    useTransform: false,
    centerPadding: "0px",
    nextArrow: <NextArrow addClassName="next-button" />,
    prevArrow: <PrevArrow addClassName="prev-button" />,
  }

  return (
    <div className="hero-slider-container">
      <div className="load"></div>
      <Slider {...settings} className="hero-slider">
        {images?.map((image, index) => {
          const imgWidth =
            (image?.gatsbyImageData.width * 90) / image?.gatsbyImageData.height
          return (
            <div className="hero-slide-container" key={index}>
              <div className="slide-flex-container">
                <GatsbyImage
                  image={image?.gatsbyImageData}
                  alt={image?.description}
                  style={{ width: `${imgWidth}vh` }}
                  className="hero-slide-image"
                ></GatsbyImage>
                {index === imageIndex ? (
                  <div className="hero-slide-overlay highlight"></div>
                ) : (
                  <div className="hero-slide-overlay darken"></div>
                )}
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default HeroSlider
