import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const Network = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const allData = data.allContentfulDesignMember.nodes
    .map(member => member.name)
    .filter(onlyUnique)

  const alphabetHeaders = allData.map(item => item.charAt(0)).filter(onlyUnique)

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/network">Network</Link>
      </HideOnScroll>
      <div className="listing-page-container">
        <div className="listing-column-container">
          {alphabetHeaders.map((letter, index) => (
            <div key={index} className="listing-column-element">
              <Fade triggerOnce={true}>
                <p className="listing-heading">{letter}</p>
              </Fade>
              <ul>
                {allData.map((item, index) => {
                  if (item.charAt(0) === letter) {
                    return (
                      <li className="listing-list-item" key={index}>
                        <Fade triggerOnce={true}>
                          <Link to="/projects" state={{ network: item }}>
                            {item}
                          </Link>
                        </Fade>
                      </li>
                    )
                  } else {
                    return null
                  }
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
    allContentfulDesignMember(sort: { name: ASC }) {
      nodes {
        id
        name
      }
    }
  }
`
export const Head = () => <Seo title="Network" />

export default Network
