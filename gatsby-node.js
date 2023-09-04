const path = require("path")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query GetData {
        allContentfulProject {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulTeamMember(
          filter: { primaryOffice: { ne: "No Longer Employed" } }
        ) {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulCareerPosting {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulNewsEntry(filter: { externalLink: { eq: null } }) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  const projects = result.data.allContentfulProject.edges
  const teamMembers = result.data.allContentfulTeamMember.edges
  const careers = result.data.allContentfulCareerPosting.edges
  const newsItems = result.data.allContentfulNewsEntry.edges

  projects.forEach(({ node }, index) => {
    const projectSlug = node.slug
    createPage({
      path: `/projects/${projectSlug}`,
      component: path.resolve(`./src/templates/singleProject.js`),
      context: {
        slug: projectSlug,
      },
    })
  })

  teamMembers.forEach(({ node }, index) => {
    const teamMemberSlug = node.slug
    createPage({
      path: `/team/${teamMemberSlug}`,
      component: path.resolve(`./src/templates/teamMember.js`),
      context: {
        slug: teamMemberSlug,
      },
    })
  })

  careers.forEach(({ node }, index) => {
    const careerSlug = node.slug
    createPage({
      path: `/careers/${careerSlug}`,
      component: path.resolve(`./src/templates/careerPosting.js`),
      context: {
        slug: careerSlug,
      },
    })
  })

  newsItems.forEach(({ node }, index) => {
    const newsSlug = node.slug
    createPage({
      path: `/news/${newsSlug}`,
      component: path.resolve(`./src/templates/newsItemPage.js`),
      context: {
        slug: newsSlug,
      },
    })
  })
}
