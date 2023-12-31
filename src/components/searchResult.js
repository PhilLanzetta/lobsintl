import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AiOutlinePlus } from "react-icons/ai"
import { HiArrowUpRight } from "react-icons/hi2"
import { Fade } from "react-awesome-reveal"

const Hit = ({ hit }) => {
  const {
    heroImage,
    title,
    typology,
    city,
    country,
    geographicRegion,
    slug,
    searchCategory,
    position,
    date,
    externalLink,
  } = hit

  return (
    <Fade triggerOnce={true}>
      {searchCategory && (
        <div className="search-result-item">
          {searchCategory === "Projects" && (
            <>
              <p className="upper search-result-category">Project</p>
              <div className="search-info-container">
                <Link
                  to={`/project/${slug}`}
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
                    <Link to={`/project/${slug}`}>
                      <p className="search-result-title">{title}</p>
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
                  <Link to={`/project/${slug}`} className="search-learn-more">
                    <AiOutlinePlus></AiOutlinePlus> Learn More
                  </Link>
                </div>
              </div>
            </>
          )}{" "}
          {searchCategory === "News" && (
            <>
              <p className="upper search-result-category">News</p>
              <div className="search-info-container">
                {externalLink ? (
                  <>
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="search-result-image-container"
                    >
                      <GatsbyImage
                        image={heroImage.gatsbyImageData}
                        alt={heroImage.description}
                        className="search-result-image"
                      ></GatsbyImage>
                    </a>
                    <div className="search-info-text">
                      <a href={externalLink} target="_blank" rel="noreferrer">
                        <p className="search-result-title">{title}</p>
                        <p className="faded">
                          {new Intl.DateTimeFormat("en-us", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(date))}
                        </p>
                      </a>
                      <a
                        href={externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="search-learn-more"
                      >
                        <HiArrowUpRight></HiArrowUpRight> Learn More
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/news/${slug}`}
                      className="search-result-image-container"
                    >
                      <GatsbyImage
                        image={heroImage.gatsbyImageData}
                        alt={heroImage.description}
                        className="search-result-image"
                      ></GatsbyImage>
                    </Link>
                    <div className="search-info-text">
                      <Link to={`/news/${slug}`}>
                        <p className="search-result-title">{title}</p>
                        <p className="faded">
                          {new Intl.DateTimeFormat("en-us", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(date))}
                        </p>
                      </Link>
                      <Link to={`/news/${slug}`} className="search-learn-more">
                        <AiOutlinePlus></AiOutlinePlus> Learn More
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {searchCategory === "People" && (
            <>
              <p className="upper search-result-category">Person</p>
              <div className="search-info-container">
                <Link
                  to={`/team/${slug}`}
                  className="search-result-image-container"
                >
                  {heroImage && (
                    <GatsbyImage
                      image={heroImage.gatsbyImageData}
                      alt={heroImage.description}
                      className="search-result-image search-person"
                    ></GatsbyImage>
                  )}
                </Link>
                <div className="search-info-text">
                  <Link to={`/team/${slug}`}>
                    <p className="search-result-title">{title}</p>
                    <p className="faded">{position}</p>
                  </Link>
                  <Link to={`/team/${slug}`} className="search-learn-more">
                    <AiOutlinePlus></AiOutlinePlus> Learn More
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Fade>
  )
}

export default Hit
