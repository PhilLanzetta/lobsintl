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

const newsQuery = `
{
  news: allContentfulNewsEntry(sort: {date: DESC}) {
    edges {
      node {
        category
        date
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
  team: allContentfulTeamMember {
    edges {
      node {
        id
        headShot {
          description
          gatsbyImageData(width: 400)
        }
        name
        primaryOffice
        slug
        title
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

function pageToAlgoliaRecord({ node: { id, ...rest } }) {
  return {
    objectID: id,
    ...rest,
  }
}

const queries = [
  {
    query: projectQuery,
    transformer: ({ data }) => data.projects.edges.map(pageToAlgoliaRecord),
    indexName: "Projects",
  },
  {
    query: newsQuery,
    transformer: ({ data }) => data.news.edges.map(pageToAlgoliaRecord),
    indexName: "News",
  },

  {
    query: teamQuery,
    transformer: ({ data }) => data.team.edges.map(pageToAlgoliaRecord),
    indexName: "People",
  },
]

module.exports = queries
