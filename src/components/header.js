import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

const Header = ({ isOpen, toggleMenu, location }) => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [teamOpen, setTeamOpen] = useState(false)
  const [newsOpen, setNewsOpen] = useState(false)
  const { width } = useWindowSize()
  const mobile = width < 601

  const handleClose = () => {
    setAboutOpen(false)
    setNewsOpen(false)
    setTeamOpen(false)
    toggleMenu()
  }

  return (
    <header>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 69.764 44.94"
          className="header-logo"
        >
          <g
            id="Group_373"
            data-name="Group 373"
            transform="translate(-263.75 -369)"
          >
            <path
              id="Path_1"
              data-name="Path 1"
              d="M288.544,413.94H263.75V369h1.124v43.983h23.671Z"
              transform="translate(0 0)"
            />
            <path
              id="Path_2"
              data-name="Path 2"
              d="M338.517,391.475a22.47,22.47,0,1,1-22.472-22.469,22.47,22.47,0,0,1,22.472,22.469"
              transform="translate(-5.003 -0.001)"
            />
            <path
              id="Path_3"
              data-name="Path 3"
              d="M291.763,373.494A4.494,4.494,0,1,1,287.269,369a4.494,4.494,0,0,1,4.494,4.494"
              transform="translate(-3.191 0)"
            />
          </g>
        </svg>
      </Link>
      <button
        className="header-menu-btn"
        onClick={isOpen ? handleClose : toggleMenu}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      <section className={`secondary-menu ${isOpen ? "show" : "hide"}`}>
        <div className="secondary-link-container">
          <Link to="/projects">Projects</Link>
          {mobile ? (
            <section>
              <aside>
                <Link to="/about">About</Link>
                <button onClick={() => setAboutOpen(!aboutOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15.23 6.566"
                    className={`drop-down-svg ${aboutOpen ? "flip-up" : ""}`}
                  >
                    <path
                      id="Path_118"
                      data-name="Path 118"
                      d="M-1532,18472l7.228,5.539,7.4-5.539"
                      transform="translate(1532.304 -18471.602)"
                      stroke-width="1"
                    />
                  </svg>
                </button>
              </aside>
              <aside
                className={`drop-down-link-container about ${
                  aboutOpen ? "" : "hide-drop-down"
                }`}
              >
                <Link to="/about/#who">Who we are</Link>
                <Link to="/about/#philosophy">Our philosophy</Link>
                <Link to="/about/#approach">Our design approach</Link>
                <Link to="/about/#awards">Awards</Link>
                <Link to="/about/#books">Books</Link>
              </aside>
            </section>
          ) : (
            <Link to="/about">About</Link>
          )}
          {mobile ? (
            <section>
              <aside>
                <Link to="/team">Team</Link>
                <button onClick={() => setTeamOpen(!teamOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15.23 6.566"
                    className={`drop-down-svg ${teamOpen ? "flip-up" : ""}`}
                  >
                    <path
                      id="Path_118"
                      data-name="Path 118"
                      d="M-1532,18472l7.228,5.539,7.4-5.539"
                      transform="translate(1532.304 -18471.602)"
                      stroke-width="1"
                    />
                  </svg>
                </button>
              </aside>
              <aside
                className={`drop-down-link-container team ${
                  teamOpen ? "" : "hide-drop-down"
                }`}
              >
                <Link to="/team/#herve">Hervé Descottes</Link>
                <Link to="/team/#teamMembers">Team Members</Link>
                <Link to="/team/#careers">Careers</Link>
              </aside>
            </section>
          ) : (
            <Link to="/team">Team</Link>
          )}
          {mobile ? (
            <section>
              <aside>
                <Link to="/news">News</Link>
                <button onClick={() => setNewsOpen(!newsOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15.23 6.566"
                    className={`drop-down-svg ${newsOpen ? "flip-up" : ""}`}
                  >
                    <path
                      id="Path_118"
                      data-name="Path 118"
                      d="M-1532,18472l7.228,5.539,7.4-5.539"
                      transform="translate(1532.304 -18471.602)"
                      stroke-width="1"
                    />
                  </svg>
                </button>
              </aside>
              <aside
                className={`drop-down-link-container news ${
                  newsOpen ? "" : "hide-drop-down"
                }`}
              >
                <Link to="news">Projects</Link>
                <Link to="news">Articles</Link>
                <Link to="news">Awards</Link>
                <Link to="news">People</Link>
              </aside>
            </section>
          ) : (
            <Link to="/about">News</Link>
          )}
          <Link to="/clients">Clients</Link>
        </div>
        <div className="secondary-link-container-right">
          <div className="contact-search-link-container">
            <Link to="/contact">Contact</Link>
            <Link to="/search">Search</Link>
          </div>
          <div className="theme-toggle-container">
            <ThemeToggler>
              {({ theme, toggleTheme }) => (
                <>
                  <span>{theme === "light" ? "Night mode" : "Day mode"}</span>
                  <button
                    onClick={() =>
                      toggleTheme(theme === "light" ? "dark" : "light")
                    }
                    className="theme-toggle-btn"
                  >
                    <div
                      className={`toggle-btn ${
                        theme === "light" ? "" : "toggle-light"
                      }`}
                    ></div>
                  </button>
                </>
              )}
            </ThemeToggler>
          </div>
        </div>
      </section>
    </header>
  )
}
export default Header
