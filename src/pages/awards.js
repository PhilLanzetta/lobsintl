import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const Awards = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const awards = data.allContentfulAward.nodes
  const years = awards.map(award => award.year).filter(onlyUnique)

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/about">About</Link> | <Link to="/awards">Awards</Link>
      </HideOnScroll>
      <div className="listing-page-container">
        <div className="listing-column-container">
          {years.map((year, index) => (
            <div key={index} className="listing-column-element">
              <Fade triggerOnce={true}>
                <p className="listing-heading">{year}</p>
              </Fade>
              <ul>
                {awards.map(award => {
                  if (award.year === year) {
                    return (
                      <li key={award.id} className="listing-list-item">
                        <Fade triggerOnce={true}>
                          <p className="upper">{award.awardName}</p>
                          {award.project && (
                            <p>{award.project[0].projectName}</p>
                          )}
                        </Fade>
                      </li>
                    )
                  } else return null
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulAward(sort: { year: DESC }) {
      nodes {
        id
        awardName
        year
        project {
          projectName
        }
      }
    }
  }
`
export const Head = () => <Seo title="Awards" />

export default Awards
