import React, { useEffect, useState } from "react"
import useWindowSize from "../utils/useWindowSize"

const HideOnScroll = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { width } = useWindowSize()

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 80)
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    if (width > 600) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      setVisible(false)
    }
  }, [prevScrollPos, visible, handleScroll])

  return (
    <div className={`page-header ${visible ? "" : "page-header-hide"}`}>
      {children}
    </div>
  )
}

export default HideOnScroll
