const indexName = `Pages`

const pageQuery = `{
  pages: allContentfulProject {
    edges {
      node {
        awards {
          awardName
        }
        designTeam {
          name
        }
        city
        client
        country
        geographicRegion
        id
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
        heroImage {
          description
          gatsbyImageData(width: 400)
        }
        internal {
          contentDigest
        }
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
