/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useState } from "react"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, location }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Header
        location={location}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}

export default Layout
