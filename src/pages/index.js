import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import HomeSlider from "../components/homeSlider"
import { marked } from "marked"
import { BsArrowRight } from "react-icons/bs"
import WorksInProgress from "../components/worksInProgress"
import { Fade } from "react-awesome-reveal"
import NewsCarousel from "../components/newsCarousel"

const IndexPage = ({ location, data }) => {
  const [randomImages, setRandomImages] = useState([])
  const homeImages = data.contentfulHomePageCarousel.projectSlides
  const mobileImages = randomImages.slice(0, 15)

  const shuffleData = array => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  useEffect(() => {
    setRandomImages(shuffleData(homeImages))
  }, [])

  const aboutHeadline =
    data.contentfulAboutLObservatoireHeadlineTextNode.headline

  const philosophy =
    data.contentfulAboutLObservatoirePhilosophyTextNode.philosophy
      .split("\n\n")[1]
      .slice(0, 298)

  const teamHeadline = data.contentfulTeamPageTeamHeadlineTextNode.teamHeadline

  const careers = data.allContentfulCareerPosting.nodes

  const worksInProgress = data.WIP.nodes
  const newsItems = data.news.nodes

  return (
    <Layout location={location}>
      <HomeSlider
        images={randomImages}
        mobileImages={mobileImages}
      ></HomeSlider>
      <div className="dark">
        <Fade triggerOnce={true} fraction={0.25}>
          <div className="home-container">
            <Link to="/about" className="home-preface-link">
              About
            </Link>
            <div className="home-right">
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(aboutHeadline),
                }}
                className="home-headline"
              ></div>
              <Link to="/about" className="home-link">
                <BsArrowRight></BsArrowRight> Learn More
              </Link>
            </div>
          </div>
        </Fade>
      </div>

      {/* <Fade triggerOnce={true} fraction={0.25}>
        <WorksInProgress projects={worksInProgress}></WorksInProgress>
      </Fade>
      <Fade triggerOnce={true}>
        <div className="home-container">
          <Link to="/about/#philosophy" className="home-preface-link">
            Philosophy
          </Link>
          <div className="home-right">
            <div className="home-headline">
              <p>{philosophy}</p>
            </div>
            <Link to="/about/#philosophy" className="home-link">
              <BsArrowRight></BsArrowRight> Read More
            </Link>
          </div>
        </div>
      </Fade>
      <Fade triggerOnce={true}>
        <NewsCarousel news={newsItems}></NewsCarousel>
      </Fade>
      <Fade triggerOnce={true} fraction={0.25}>
        <div className="home-container">
          <Link to="/team" className="home-preface-link">
            Team
          </Link>
          <div className="home-right">
            <div className="home-headline">
              <p>{teamHeadline}</p>
            </div>
            <Link to="/team" className="home-link">
              <BsArrowRight></BsArrowRight> Learn More
            </Link>
          </div>
        </div>
      </Fade>
      <Fade triggerOnce={true} fraction={0.25}>
        <div className="home-container" id="careers">
          <p className="home-preface-link">Careers</p>
          <div className="team-right">
            <div className="careers-container">
              {careers.map(career => (
                <div key={career.id}>
                  <hr className="faded"></hr>
                  <div className="career-posting">
                    <p>{career.jobTitle}</p>
                    <Link
                      to={`/careers/${career.slug}`}
                      className="home-link career-apply"
                    >
                      <BsArrowRight></BsArrowRight> Apply Here
                    </Link>
                  </div>
                </div>
              ))}
              <hr className="faded"></hr>
            </div>
          </div>
        </div>
      </Fade> */}
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomePageCarousel {
      projectSlides {
        city
        country
        id
        geographicRegion
        heroImage {
          description
          desktopImage: gatsbyImageData(layout: FULL_WIDTH)
          mobileImage: gatsbyImageData(width: 800)
        }
        projectName
        slug
        typology
        shortExcerpt
      }
    }
    contentfulAboutLObservatoireHeadlineTextNode {
      headline
    }
    contentfulAboutLObservatoirePhilosophyTextNode {
      philosophy
    }
    contentfulTeamPageTeamHeadlineTextNode {
      teamHeadline
    }
    allContentfulCareerPosting(sort: { postingDate: DESC }) {
      nodes {
        id
        jobTitle
        slug
      }
    }
    WIP: allContentfulProject(
      filter: { status: { eq: "In Progress" } }
      sort: { year: DESC }
      limit: 6
    ) {
      nodes {
        heroImage {
          gatsbyImageData(width: 400)
          description
        }
        id
        projectName
        city
        country
        typology
        slug
      }
    }
    news: allContentfulNewsEntry(sort: { date: DESC }, limit: 10) {
      nodes {
        id
        heroImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        title
        date
        slug
        externalLink
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
