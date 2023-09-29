import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <div className="error-page">
      <h1>404: Not Found</h1>
      <p>The page you have requested no longer exists at this location.</p>
      <Link to="/" className="error-button">
        Return Home
      </Link>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
