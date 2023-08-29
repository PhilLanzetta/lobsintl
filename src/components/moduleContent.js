import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import ReactPlayer from "react-player"

const ModuleContent = ({ moduleContent }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div className="module-content-container">
      {moduleContent.map(item => {
        if (item.singleId) {
          return (
            <div key={item.singleId} className="module-image-container">
              <figure className="single-col-image">
                <GatsbyImage
                  image={item.image.image.gatsbyImageData}
                  alt={item.image.image.description}
                  className="image"
                ></GatsbyImage>
                <figcaption>{item.image.caption}</figcaption>
              </figure>
            </div>
          )
        } else if (item.twoColId) {
          return (
            <div key={item.twoColId} className="module-image-container">
              {item.images.map((image, index) => (
                <figure key={index} className="two-col-image">
                  <GatsbyImage
                    image={image.image.gatsbyImageData}
                    alt={image.image.description}
                    className="image"
                  ></GatsbyImage>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          )
        } else
          return (
            <div key={item.videoId} className="module-video-container">
              <ReactPlayer
                url={item.vimeoLink}
                width={"100%"}
                height={"100%"}
                className="module-video-player"
                controls
                playing={isPlaying}
              ></ReactPlayer>
              <div
                className={`module-video-cover
                  ${isPlaying ? "hide-video-cover" : ""}`}
              >
                <GatsbyImage
                  image={item.coverImage.gatsbyImageData}
                  alt={item.coverImage.description}
                  className="module-video-img"
                ></GatsbyImage>
                <button
                  className="module-play-btn"
                  onClick={() => setIsPlaying(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 132">
                    <g
                      id="Group_287"
                      data-name="Group 287"
                      transform="translate(-894 -3360)"
                    >
                      <g
                        id="Ellipse_116"
                        data-name="Ellipse 116"
                        transform="translate(894 3360)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                      >
                        <circle cx="66" cy="66" r="66" stroke="none" />
                        <circle cx="66" cy="66" r="65" fill="none" />
                      </g>
                      <g
                        id="Polygon_1"
                        data-name="Polygon 1"
                        transform="translate(985.5 3402.5) rotate(90)"
                        fill="none"
                      >
                        <path d="M25.5,0,51,44H0Z" stroke="none" />
                        <path
                          d="M 25.5 3.988639831542969 L 3.470687866210938 42 L 47.52931213378906 42 L 25.5 3.988639831542969 M 25.5 0 L 51 44 L 0 44 L 25.5 0 Z"
                          stroke="none"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default ModuleContent
