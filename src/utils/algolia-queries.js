const projectQuery = `{
  projects: allContentfulProject(sort: { year: DESC }) {
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
        projectLeader {
          id
          name
          title
        }
        title: projectName
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

const newsQuery = `
{
  news: allContentfulNewsEntry(sort: {date: DESC}) {
    edges {
      node {
        category
        year: date
        headline
        id
        moduleContent {
          ... on ContentfulNewsLongText {
            id
            text {
              text
            }
          }
        }
        slug
        title
        internal {
          contentDigest
        }
        creditText
        heroImage {
          description
          gatsbyImageData(width: 400)
        }
      }
    }
  }
}`

const teamQuery = `{
  people: allContentfulTeamMember {
    edges {
      node {
        id
        heroImage: headShot {
          description
          gatsbyImageData(width: 400)
        }
        title: name
        primaryOffice
        slug
        position: title
        teamMemberBiography {
          teamMemberBiography
        }
        internal {
            contentDigest
          }
      }
    }
  }
}`

const projectToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node
  return {
    objectID: id,
    searchCategory: "Project",
    principal: "Hervé Descottes",
    ...rest,
  }
}

const newsToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node
  return {
    objectID: id,
    searchCategory: "News",
    ...rest,
  }
}

const personToAlgoliaRecord = edge => {
  const { id, ...rest } = edge.node
  return {
    objectID: id,
    searchCategory: "Person",
    ...rest,
  }
}

const queries = [
  {
    query: projectQuery,
    transformer: ({ data }) =>
      data.projects.edges.map(edge => projectToAlgoliaRecord(edge)),
    indexName: "Projects",
  },
  {
    query: newsQuery,
    transformer: ({ data }) =>
      data.news.edges.map(edge => newsToAlgoliaRecord(edge)),
    indexName: "News",
  },

  {
    query: teamQuery,
    transformer: ({ data }) =>
      data.people.edges.map(edge => personToAlgoliaRecord(edge)),
    indexName: "People",
  },
]

module.exports = queries
