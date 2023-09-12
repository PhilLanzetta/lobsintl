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
    searchCategory,
    ...rest
  } = hit
  console.log(hit)
  return (
    <div className="search-result-item">
      {searchCategory === "Project" && (
        <>
          <p className="upper search-result-category">Project</p>
          <div className="search-info-container">
            <Link
              to={`/projects/${slug}`}
              className="search-result-image-container"
            >
              <GatsbyImage
                image={heroImage.gatsbyImageData}
                alt={heroImage.description}
                className="search-result-image"
              ></GatsbyImage>
            </Link>
            <div className="search-info-text">
              <div>
                <Link to={`/projects/${slug}`}>
                  <p className="search-result-title">{projectName}</p>
                </Link>
                <div className="tile-tag-container">
                  {typology.map((type, index) => (
                    <Link
                      state={{ typeFilter: type }}
                      key={index}
                      className="tile-tag-btn"
                      to="/projects"
                    >
                      {type}
                    </Link>
                  ))}
                  {geographicRegion === "Worldwide" ? (
                    <Link
                      className="tile-tag-btn"
                      to="/projects"
                      state={{ regionFilter: [geographicRegion] }}
                    >
                      {geographicRegion}
                    </Link>
                  ) : (
                    <Link
                      className="tile-tag-btn"
                      to="/projects"
                      state={{ city: city, country: country }}
                    >
                      {city && `${city},`} {country}
                    </Link>
                  )}
                </div>
              </div>
              <Link to={`/projects/${slug}`} className="search-learn-more">
                <AiOutlinePlus></AiOutlinePlus> Learn More
              </Link>
            </div>
          </div>
        </>
      )}{" "}
      {searchCategory === "News" && (
        <>
          <p className="upper search-result-category">News</p>
        </>
      )}
      {searchCategory === "Person" && (
        <>
          <p className="upper search-result-category">Person</p>
        </>
      )}
    </div>
  )
}

export default Hit
