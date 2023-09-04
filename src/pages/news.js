import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import HideOnScroll from "../components/hideOnScroll"

const News = () => {
  return (
    <Layout>
      <HideOnScroll>
        <Link to="/news">News</Link> |{" "}
        <button>Projects</button> |{" "}
        <button>Articles</button> |{" "}
        <button>Awards</button> |{" "}
        <button>People</button>
      </HideOnScroll>
    </Layout>
  )
}

export default News
