import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"

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
      <div className="page-header">
        <Link to="/clients">Clients</Link>
      </div>
      <hr className="faded-line page-header-bottom"></hr>
      <div className="listing-page-container">
        <div className="listing-column-container">
          {alphabetHeaders.map((letter, index) => (
            <div key={index} className="listing-column-element">
              <p className="listing-heading">{letter}</p>
              <ul>
                {sortedClients.map((client, index) => {
                  if (client.charAt(0) === letter) {
                    return (
                      <li className="listing-list-item" key={index}>
                        <Link to="/projects" state={{ client: client }}>
                          {client}
                        </Link>
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
  }
`

export default Clients
