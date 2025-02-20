const pagesQuery = `{
  allContentfulEntry {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulProject {
          project: id
          awards {
            awardName
          }
          designTeam {
            name
          }
          city
          client
          state
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
          projectTeam: team {
            id
            name
            title
          }
          title: projectName
          slug
          typology
          leedCertification
          projectCode
          year
          heroImage {
            description
            gatsbyImageData(width: 400)
          }
          internal {
            contentDigest
          }
        }
        ... on ContentfulTeamMember {
          team: id
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
        ... on ContentfulNewsEntry {
        category
        date
        headline
        news: id
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
        externalLink
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
  }
}`

const pageToAlgoliaRecord = edge => {
  const { project, news, team, id, ...rest } = edge.node
  if (project) {
    return {
      objectID: id,
      searchCategory: "Projects",
      principal: "Hervé Descottes",
      ...rest,
    }
  } else if (news) {
    return {
      objectID: id,
      searchCategory: "News",
      ...rest,
    }
  } else if (team) {
    return {
      objectID: id,
      searchCategory: "People",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const queries = [
  {
    query: pagesQuery,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => pageToAlgoliaRecord(edge)),
    indexName: `Pages`,
  },
]

module.exports = queries
