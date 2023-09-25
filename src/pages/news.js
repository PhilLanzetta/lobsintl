import React, { useState } from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import HideOnScroll from "../components/hideOnScroll"
import { GatsbyImage } from "gatsby-plugin-image"
import { BsArrowRight } from "react-icons/bs"
import { HiArrowUpRight } from "react-icons/hi2"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const News = ({ data, location }) => {
  const allNews = data.allContentfulNewsEntry.nodes
  const [newsItems, setNewsItems] = useState(
    location.state?.category
      ? allNews.filter(item => item.category === location.state.category)
      : allNews
  )
  const filterNews = category => {
    const filteredNews = allNews.filter(item => item.category === category)
    setNewsItems(filteredNews)
  }

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/news" onClick={() => setNewsItems(allNews)}>
          News
        </Link>{" "}
        | <button onClick={() => filterNews("Project")}>Projects</button> |{" "}
        <button onClick={() => filterNews("Award")}>Awards</button> |{" "}
        <button onClick={() => filterNews("Lecture")}>Lectures</button> |{" "}
        <button onClick={() => filterNews("Event")}>Events</button> |{" "}
        <button onClick={() => filterNews("Person")}>People</button>
      </HideOnScroll>
      <div className="news-page">
        {newsItems.map(item => {
          const isExternal = item.externalLink !== null
          return (
            <div key={item.id} className="news-item">
              <div className="news-category-image-container">
                <Fade triggerOnce={true}>
                  <p className="upper news-item-category">{item.category}</p>
                  <GatsbyImage
                    image={item.heroImage.gatsbyImageData}
                    alt={item.heroImage.description}
                    className="news-item-image"
                  ></GatsbyImage>
                </Fade>
              </div>
              <div className="news-item-text">
                <Fade triggerOnce={true}>
                  <p className="news-date">
                    {new Date(
                      item.date.replace(/-/g, "/").replace(/T.+/, "")
                    ).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="news-headline">{item.headline}</h2>
                  {isExternal ? (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="home-link"
                    >
                      <HiArrowUpRight></HiArrowUpRight> Visit
                    </a>
                  ) : (
                    <Link to={`/news/${item.slug}`} className="home-link">
                      <BsArrowRight></BsArrowRight> Read More
                    </Link>
                  )}
                </Fade>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulNewsEntry(sort: { date: DESC }) {
      nodes {
        slug
        id
        externalLink
        category
        headline
        heroImage {
          gatsbyImageData
          description
          id
        }
        date
      }
    }
  }
`
export const Head = () => <Seo title="News" />

export default News
