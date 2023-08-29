import React from "react"
import { marked } from "marked"
import { Fade } from "react-awesome-reveal"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"

const ProjectIntro = ({
  headline,
  title,
  body,
  city,
  country,
  year,
  state,
  region,
}) => {
  const { width } = useWindowSize()
  const mobile = width < 601
  const hasLocation = city || state || country
  return (
    <section className="project-intro-container">
      <div className="project-intro-max-width">
        <article className="project-intro-top">
          <div className="title-city">
            <h1>{title}</h1>
            {hasLocation ? (
              <div>
                {city && (
                  <Link to="/projects" state={{ city: city }}>
                    {city},
                  </Link>
                )}{" "}
                {state && (
                  <Link to="/projects" state={{ state: state }}>
                    {state},
                  </Link>
                )}{" "}
                {country && (
                  <Link to="/projects" state={{ country: country }}>
                    {country}
                  </Link>
                )}
              </div>
            ) : (
              <Link to="/projects" state={{ regionFilter: [region] }}>
                {region}
              </Link>
            )}
          </div>
          <Link to="/projects" state={{ year: year }}>
            {year}
          </Link>
        </article>
        <article>
          {headline && (
            <Fade triggerOnce={true} fraction={mobile ? 0 : 0.25}>
              <article
                dangerouslySetInnerHTML={{ __html: marked.parse(headline) }}
                className="project-intro-headline"
              ></article>
            </Fade>
          )}

          {body && (
            <Fade triggerOnce={true} cascade>
              <article
                className="project-intro-body"
                dangerouslySetInnerHTML={{ __html: marked.parse(body) }}
              ></article>
            </Fade>
          )}
        </article>
      </div>
    </section>
  )
}

export default ProjectIntro
