import { includes, orderBy } from "lodash"

export class RelatedProjectsFactory {
  // (1.) Create by passing in projects, currentSlug
  constructor(projects, currentProjectSlug) {
    // (2.) Don't include the current project in projects list
    this.projects = projects.filter(
      aProject => aProject.slug !== currentProjectSlug
    )

    this.currentProjectSlug = currentProjectSlug
    // (3.) Set default values
    this.maxProjects = 3
    this.category = null
    this.tags = []
  }

  // (4.) Builder pattern usage
  setMaxProjects(m) {
    this.maxProjects = m
    return this
  }

  setCategory(aCategory) {
    this.category = aCategory
    return this
  }

  setTags(tagsArray) {
    this.tags = tagsArray
    return this
  }

  getProjects() {
    const { category, tags, projects, maxProjects } = this
    // (5.) We use an Identity Map to keep track of score
    const identityMap = {}

    if (!!tags === false || tags.length === 0) {
      console.error("RelatedProjectsFactory: Tags not provided, use setTags().")
      return []
    }

    if (!!category === false || category.length === 0) {
      console.error(
        "RelatedProjectsFactory: Category not provided, use setCategory()."
      )
      return []
    }

    function getSlug(project) {
      return project.slug
    }

    function addToMap(project) {
      const slug = getSlug(project)
      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          project: project,
          points: 0,
        }
      }
    }

    // (7.) For category matches, we add 2 points
    function addCategoryPoints(project, category) {
      const categoryPoints = 1
      const slug = getSlug(project)

      project.typology.forEach(aCategory => {
        if (includes(category, aCategory)) {
          identityMap[slug].points += categoryPoints
        }
      })
    }

    // (8.) For tags matches, we add 1 point
    function addTagsPoints(project, tags) {
      const tagPoint = 2
      const slug = getSlug(project)

      project.metadata.tags.forEach(aTag => {
        if (includes(tags, aTag)) {
          identityMap[slug].points += tagPoint
        }
      })
    }

    function getIdentityMapAsArray() {
      return Object.keys(identityMap).map(slug => identityMap[slug])
    }

    // (6.) Map over all projects, add to map and add points
    for (let project of projects) {
      addToMap(project)
      addCategoryPoints(project, category)
      addTagsPoints(project, tags)
    }

    // (9.) Convert the identity map to an array
    const arrayIdentityMap = getIdentityMapAsArray()

    // (10.) Use a lodash utility function to sort them
    // by points, from greatest to least
    const RelatedProjects = orderBy(arrayIdentityMap, ["points"], ["desc"])

    // (11. Take the max number projects requested)
    return RelatedProjects.splice(0, maxProjects)
  }
}
