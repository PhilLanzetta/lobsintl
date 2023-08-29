import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const Network = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const architects = data.allContentfulProject.nodes
    .map(item => item.architect)
    .filter(item => item !== null)
    .filter(onlyUnique)
    .map(item => ({ type: "architect", name: item }))

  const networkNames = data.allContentfulProject.nodes
    .map(item => item.furtherNetworkLinks)
    .filter(item => item !== null)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .map(item => ({ type: item.split(": ")[0], name: item.split(": ")[1] }))

  const allData = architects.concat(networkNames).sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  })

  const alphabetHeaders = allData
    .map(item => item.name.charAt(0))
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
                {allData.map((item, index) => {
                  if (item.name.charAt(0) === letter) {
                    return (
                      <li className="listing-list-item" key={index}>
                        <Link
                          to="/projects"
                          state={
                            item.type === "architect"
                              ? { architect: item.name }
                              : { network: [item.type, item.name].join(": ") }
                          }
                        >
                          {item.name}
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
        architect
        furtherNetworkLinks
      }
    }
  }
`

export default Network
