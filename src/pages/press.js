import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"

const Press = ({ data }) => {
  const pressItems = data.allContentfulPress.nodes
  return (
    <Layout>
      <HideOnScroll>
        <Link to="/press">Press</Link>
      </HideOnScroll>
      <div className="listing-page-container">
        <div className="press-flex-container">
          {pressItems.map(item => (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              key={item.id}
              className="press-page-item"
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
