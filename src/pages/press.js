import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"

const Press = ({ data }) => {
  const pressItems = data.allContentfulPress.nodes
  return (
    <Layout>
      <HideOnScroll>
        <Link to="/press">Press</Link>
      </HideOnScroll>
      <div className="listing-page-container">
        <div className="press-flex-container">
          <Fade triggerOnce={true} className="press-page-item">
            {pressItems.map(item => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <p className="press-item-pub">{item.publication}</p>
                <p className="press-item-title">{item.title}</p>
                <p className="press-item-date">
                  {new Date(item.publicationDate).toLocaleDateString("en-us", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </a>
            ))}
          </Fade>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPress(sort: { publicationDate: DESC }) {
      nodes {
        id
        link
        publication
        publicationDate
        title
      }
    }
  }
`

export default Press
