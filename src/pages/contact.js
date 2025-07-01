import React from "react"
import { HiArrowUpRight } from "react-icons/hi2"
import GoogleMap from "../components/googleMap"
import Layout from "../components/layout"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"
import HideOnScroll from "../components/hideOnScroll"
import Seo from "../components/seo"

const Contact = () => {
  const { width } = useWindowSize()
  return (
    <Layout>
      <HideOnScroll>
        <Link to="/contact">Contact</Link>
      </HideOnScroll>
      <div className="contact-container">
        <div className="contact-text-container">
          {width > 600 && (
            <h2>
              Based in New York, Paris, Seoul, and London, we’re one team driven by the
              same values and passion
            </h2>
          )}
          <div className="contact-info-container">
            <div className="contact-info-column">
              <div>
                <p className="upper contact-heading">Address</p>
                <p>
                  120 Walker Street 7th Floor East
                  <br />
                  New York, New York 10013 USA
                </p>
                <a
                  href="https://goo.gl/maps/EgzCLXQsUTnbqwEg8"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-directions-link"
                >
                  Get Directions <HiArrowUpRight></HiArrowUpRight>
                </a>
              </div>
              <div>
                <p className="upper contact-heading">Phone Number</p>
                <a href="tel:12122554463">+1 212 255 4463</a>
              </div>
            </div>
            <div className="contact-info-column">
              <div>
                <p className="upper contact-heading">Press Inquiries</p>
                <a href="mailto:pr@lobsintl.com">pr@lobsintl.com</a>
              </div>
              <div>
                <p className="upper contact-heading">General Information</p>{" "}
                <a href="mailto:info@lobsintl.com">info@lobsintl.com</a>
              </div>
              <div>
                <p className="upper contact-heading">New Business</p>
                <a href="mailto:bd@lobsintl.com">bd@lobsintl.com</a>
              </div>
            </div>
          </div>
        </div>
        <GoogleMap></GoogleMap>
        {width < 601 && (
          <h2>
            Based in New York, Paris, and Seoul, we’re one team driven by the
            same values and passion
          </h2>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Contact" />

export default Contact
