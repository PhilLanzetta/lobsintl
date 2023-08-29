import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

const Awards = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const awards = data.allContentfulAward.nodes
  const years = awards.map(award => award.year).filter(onlyUnique)

  return (
    <Layout>
      <div className="page-header">
        <Link to="/about">About</Link> | <Link to="/awards">Awards</Link>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="listing-page-container">
        <div className="listing-column-container">
          {years.map((year, index) => (
            <div key={index} className="listing-column-element">
              <p className="listing-heading">{year}</p>
              <ul>
                {awards.map(award => {
                  if (award.year === year) {
                    return (
                      <li key={award.id} className="listing-list-item">
                        <p className="upper">{award.awardName}</p>
                        <p>{award.project[0].projectName}</p>
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

export default Awards
