import React, { useRef } from "react"
import Slider from "react-slick"
import { Link } from "gatsby"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"
import useWindowSize from "../utils/useWindowSize"
import { GatsbyImage } from "gatsby-plugin-image"
import { HiArrowUpRight } from "react-icons/hi2"

const NewsCarousel = ({ news }) => {
  const sliderRef = useRef()
  const { width } = useWindowSize()
  const isMobile = width < 601
  const settings = {
    slidesToShow: 3.75,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1.15,
        },
      },
    ],
  }
  return (
    <div className="wip-container">
      <div className="wip-heading">
        <div className="wip-heading-element">
          <Link to="/news" className="upper wip-title">
            News
          </Link>
          {!isMobile && (
            <Link to="/news" className="home-link">
              Read All News
            </Link>
          )}
        </div>
        {!isMobile && (
          <div className="wip-heading-element">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              aria-label="go to previous"
            >
              <BsArrowLeft></BsArrowLeft>
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              aria-label="go to next"
            >
              <BsArrowRight></BsArrowRight>
            </button>
          </div>
        )}
      </div>
      <Slider {...settings} ref={sliderRef}>
        {news.map(newsItem => (
          <div key={newsItem.id}>
            {newsItem.externalLink ? (
              <a
                href={newsItem.externalLink}
                target="_blank"
                rel="noreferrer"
                className="news-carousel-item"
              >
                <GatsbyImage
                  image={newsItem.heroImage.gatsbyImageData}
                  alt={newsItem.heroImage.description}
                  className="news-carousel-image"
                ></GatsbyImage>
                <p className="news-carousel-date">
                  {new Date(
                    newsItem.date.replace(/-/g, "/").replace(/T.+/, "")
                  ).toLocaleDateString("en-us", {
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  <HiArrowUpRight></HiArrowUpRight>
                </p>
                <p className="lofty">{newsItem.title}</p>
              </a>
            ) : (
              <Link
                to={`/news/${newsItem.slug}`}
                className="news-carousel-item"
              >
                <GatsbyImage
                  image={newsItem.heroImage.gatsbyImageData}
                  alt={newsItem.heroImage.description}
                  className="news-carousel-image"
                ></GatsbyImage>
                <p className="news-carousel-date">
                  {new Intl.DateTimeFormat("en-us", {
                    month: "long",
                    day: "numeric",
                  }).format(new Date(newsItem.date))}
                </p>
                <p className="lofty">{newsItem.title}</p>
              </Link>
            )}
          </div>
        ))}
      </Slider>
      {isMobile && (
        <Link to="/news" className="home-link" style={{ marginTop: "0px" }}>
          <BsArrowRight></BsArrowRight> Read All News
        </Link>
      )}
    </div>
  )
}

export default NewsCarousel
