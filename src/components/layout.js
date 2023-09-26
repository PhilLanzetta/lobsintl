/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import { motion, AnimatePresence } from "framer-motion"

const Layout = ({ children, location, filterNews }) => {
  return (
    <>
      <Header location={location} filterNews={filterNews} />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <main>{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer></Footer>
    </>
  )
}

export default Layout
