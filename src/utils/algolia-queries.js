const indexName = `Pages`

const pageQuery = `{
  pages: allContentfulProject {
    edges {
      node {
        architect
        awards {
          awardName
        }
        city
        client
        country
        furtherNetworkLinks
        geographicRegion
        id
        interiorDesigner
        metadata {
          tags {
            id
            name
          }
        }
        press {
          id
          publication
          title
        }
        principal {
          id
          name
          title
        }
        projectLeader {
          id
          name
          title
        }
        projectName
        slug
        typology
        year
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, ...rest } }) {
  return {
    objectID: id,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
  },
]

module.exports = queries
