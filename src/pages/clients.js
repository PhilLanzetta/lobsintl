import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"
import HideOnScroll from "../components/hideOnScroll"
import { Fade } from "react-awesome-reveal"
import Seo from "../components/seo"

const Clients = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const sortedClients = data.allContentfulProject.nodes
    .map(client => client.client)
    .filter(item => item !== null)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .sort()

  const alphabetHeaders = sortedClients
    .map(client => client.charAt(0))
    .filter(onlyUnique)

  return (
    <Layout>
      <HideOnScroll>
        <Link to="/clients">Clients</Link>
      </HideOnScroll>
      <div className="listing-page-container">
        <div
          dangerouslySetInnerHTML={{
            __html:
              data.contentfulClientPageHeading.heading.childMarkdownRemark.html,
          }}
          className="client-page-headline"
        ></div>
        <div className="listing-column-container">
          {alphabetHeaders.map((letter, index) => (
            <div key={index} className="listing-column-element">
              <Fade triggerOnce={true}>
                <p className="listing-heading">{letter}</p>
              </Fade>
              <ul>
                {sortedClients.map((client, index) => {
                  if (client.charAt(0) === letter) {
                    return (
                      <li className="listing-list-item" key={index}>
                        <Fade triggerOnce={true}>
                          <Link to="/projects" state={{ client: client }}>
                            {client}
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
    allContentfulProject {
      nodes {
        client
      }
    }
    contentfulClientPageHeading {
      heading {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
export const Head = () => <Seo title="Clients" />

export default Clients
