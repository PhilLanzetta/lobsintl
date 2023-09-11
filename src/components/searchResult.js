import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AiOutlinePlus } from "react-icons/ai"

const Hit = ({ hit }) => {
  const {
    heroImage,
    projectName,
    typology,
    city,
    country,
    geographicRegion,
    slug,
  } = hit
  return (
    <div className="search-result-item">
      <p className="upper search-result-category">Project</p>
      <div className="search-info-container">
        <GatsbyImage
          image={heroImage.gatsbyImageData}
          alt={heroImage.description}
          className="search-result-image"
        ></GatsbyImage>
        <div className="search-info-text">
          <div>
            <p className="search-result-title">{projectName}</p>
            <div className="tile-tag-container">
              {typology.map((type, index) => (
                <p key={index} className="tile-tag-btn">
                  {type}
                </p>
              ))}
              {geographicRegion === "Worldwide" ? (
                <p className="tile-tag-btn">{geographicRegion}</p>
              ) : (
                <p className="tile-tag-btn">
                  {city && `${city},`} {country}
                </p>
              )}
            </div>
          </div>
          <Link to={`/projects/${slug}`} className="search-learn-more">
            <AiOutlinePlus></AiOutlinePlus> Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hit
