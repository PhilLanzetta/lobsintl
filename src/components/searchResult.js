import React from "react"
import { Link } from "gatsby"


const Hit = ({ hit }) => {
 console.log(hit)
  const { node } = hit

  return (
    <>
      {hit.path !== "/" && hit.path !== "/404/" && hit.path !== "/404.html" && (
        <Link to={hit.path}>
          <p></p>
          <p></p>
        </Link>
      )}
    </>
  )
}

export default Hit
