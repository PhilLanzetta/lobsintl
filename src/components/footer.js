import React from "react"
import { Link } from "gatsby"
import { HiArrowUpRight } from "react-icons/hi2"
import useWindowSize from "../utils/useWindowSize"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { BsSun, BsMoon } from "react-icons/bs"
import { Fade } from "react-awesome-reveal"

const Footer = ({ location }) => {
  const { width } = useWindowSize()
  const home = location?.pathname === "/"
  return (
    <footer className={`footer ${home ? "footer-home" : ""}`}>
      <div className="footer-column-logo">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 69.764 44.94"
            className="footer-logo"
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
        <div>
          <p className="upper">L’Observatoire International</p>
          <p>Lighting the World</p>
        </div>
        <p className="footer-credit">
          Website Designed and Developed by{" "}
          <a
            href="https://www.pacificpacific.pub"
            target="_blank"
            rel="noreferrer"
          >
            Pacific
          </a>
        </p>
      </div>
      <div className="footer-middle">
        <div className="footer-column-location">
          <p className="upper footer-locations">New York | Paris | Seoul</p>
          <div>
            <p className="upper">New York</p>
            <a
              href="https://goo.gl/maps/EgzCLXQsUTnbqwEg8"
              target="_blank"
              rel="noreferrer"
            >
              <p>120 Walker Street 7th Floor East</p>
              <p>New York, New York 10013 USA</p>
            </a>
            <a href="tel:12122554463">T +1 212 255 4463</a>
          </div>
        </div>
        <div className="footer-column-emails">
          <div>
            <p className="upper">General Information</p>
            <a href="mailto:info@lobsintl.com">info@lobsintl.com</a>
          </div>
          <div>
            <p className="upper">Press Inquiries</p>
            <a href="mailto:pr@lobsintl.com">pr@lobsintl.com</a>
          </div>
          <div>
            <p className="upper">New Business</p>
            <a href="mailto:bd@lobsintl.com">bd@lobsintl.com</a>
          </div>
          {width < 901 && (
            <div className="theme-toggle-container-mobile">
              <ThemeToggler>
                {({ theme, toggleTheme }) => (
                  <>
                    <button
                      onClick={() =>
                        toggleTheme(theme === "light" ? "dark" : "light")
                      }
                      className="theme-toggle-btn"
                      aria-label="change display mode"
                    >
                      {theme === "light" ? (
                        <Fade triggerOnce={true}>
                          <BsMoon></BsMoon>
                        </Fade>
                      ) : (
                        <Fade triggerOnce={true}>
                          <BsSun></BsSun>
                        </Fade>
                      )}
                    </button>
                  </>
                )}
              </ThemeToggler>
            </div>
          )}
        </div>
      </div>
      <div className="footer-column-links">
        <div>
          <p className="upper">Newsletter</p>
          <a
            href="https://lp.constantcontactpages.com/sl/N8pDHRJ"
            target="_blank"
            rel="noreferrer"
            className="careers-link"
          >
            Sign Up <HiArrowUpRight></HiArrowUpRight>
          </a>
        </div>
        <div>
          <p className="upper">Careers</p>
          <Link to="/team/#careers" className="careers-link">
            Join us <HiArrowUpRight></HiArrowUpRight>
          </Link>
        </div>
        <div className="footer-social">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/lobservatoire_intl/"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/lobservatoireinternational/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/LOBSINTL"
          >
            Twitter
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/hdescottes"
          >
            Linkedin
          </a>
          <a target="_blank" rel="noreferrer" href="https://vimeo.com/lobsintl">
            Vimeo
          </a>
          <p className="footer-credit-mobile">
            Website Designed and Developed by{" "}
            <a
              href="https://www.pacificpacific.pub"
              target="_blank"
              rel="noreferrer"
            >
              Pacific
            </a>
          </p>
        </div>
        {width > 900 && (
          <div className="theme-toggle-container">
            <ThemeToggler>
              {({ theme, toggleTheme }) => (
                <>
                  <button
                    onClick={() =>
                      toggleTheme(theme === "light" ? "dark" : "light")
                    }
                    className="theme-toggle-btn"
                    aria-label="change display mode"
                  >
                    {theme === "light" ? (
                      <Fade triggerOnce={true}>
                        <BsMoon></BsMoon>
                      </Fade>
                    ) : (
                      <Fade triggerOnce={true}>
                        <BsSun></BsSun>
                      </Fade>
                    )}
                  </button>
                </>
              )}
            </ThemeToggler>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
